#!/usr/bin/env tsx
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { pathToFileURL } from "url";

type CliOptions = {
  sourceLocale: string;
  locales: string[];
  messagesRoot: string;
  provider: string;
  dryRun: boolean;
  cachePath: string;
};

type LocaleTree = Record<string, unknown>;

type MergeStats = {
  stringsProcessed: number;
  reusedFromCache: number;
  reusedExisting: number;
  translated: number;
};

const RESERVED_KEYS = new Set(["tone"]);

interface TranslationProvider {
  name: string;
  translateBatch(args: {
    texts: string[];
    from: string;
    to: string;
  }): Promise<string[]>;
}

class PassthroughProvider implements TranslationProvider {
  public readonly name = "passthrough";

  async translateBatch({ texts }: { texts: string[] }): Promise<string[]> {
    return texts;
  }
}

class AzureTranslator implements TranslationProvider {
  public readonly name = "azure";
  private readonly endpoint: string;
  private readonly key: string;
  private readonly region: string | undefined;

  constructor(opts: { endpoint: string; key: string; region?: string }) {
    this.endpoint = opts.endpoint.replace(/\/+$/, "");
    this.key = opts.key;
    this.region = opts.region;
  }

  async translateBatch({
    texts,
    from,
    to,
  }: {
    texts: string[];
    from: string;
    to: string;
  }): Promise<string[]> {
    if (texts.length === 0) {
      return [];
    }

    const url = new URL("/translate", this.endpoint);
    url.searchParams.set("api-version", "3.0");
    url.searchParams.set("from", from);
    url.searchParams.append("to", to);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": this.key,
        "Content-Type": "application/json",
        ...(this.region ? { "Ocp-Apim-Subscription-Region": this.region } : {}),
      },
      body: JSON.stringify(texts.map((text) => ({ text }))),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `Azure Translator request failed: ${response.status} ${response.statusText} - ${body}`
      );
    }

    const payload = (await response.json()) as Array<{
      translations: Array<{ text: string }>;
    }>;

    return payload.map(
      (item, index) => item.translations?.[0]?.text ?? texts[index]
    );
  }
}

class GoogleTranslator implements TranslationProvider {
  public readonly name = "google";
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async translateBatch({
    texts,
    from,
    to,
  }: {
    texts: string[];
    from: string;
    to: string;
  }): Promise<string[]> {
    if (texts.length === 0) {
      return [];
    }

    const endpoint = new URL(
      "https://translation.googleapis.com/language/translate/v2"
    );
    endpoint.searchParams.set("key", this.apiKey);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: texts,
        source: from,
        target: to,
        format: "text",
      }),
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `Google Translate request failed: ${response.status} ${response.statusText} - ${body}`
      );
    }

    const payload = (await response.json()) as {
      data?: { translations?: Array<{ translatedText?: string }> };
    };
    const translations = payload.data?.translations ?? [];

    return texts.map((text, index) => {
      const translated = translations[index]?.translatedText;
      return translated ? decodeHtmlEntities(translated) : text;
    });
  }
}

type CacheData = Record<string, Record<string, string>>;

class TranslationCache {
  private dirty = false;
  private readonly data: CacheData = {};

  constructor(private readonly filePath: string) {}

  async load() {
    if (!existsSync(this.filePath)) {
      return;
    }
    const raw = await fs.readFile(this.filePath, "utf8");
    const parsed = JSON.parse(raw) as CacheData;
    for (const locale of Object.keys(parsed)) {
      this.data[locale] = parsed[locale];
    }
  }

  get(locale: string, hash: string): string | undefined {
    return this.data[locale]?.[hash];
  }

  set(locale: string, hash: string, translation: string) {
    if (!this.data[locale]) {
      this.data[locale] = {};
    }
    if (this.data[locale][hash] !== translation) {
      this.dirty = true;
      this.data[locale][hash] = translation;
    }
  }

  hasLocale(locale: string) {
    return Boolean(this.data[locale]);
  }

  async save() {
    if (!this.dirty) {
      return;
    }
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    await fs.writeFile(
      this.filePath,
      JSON.stringify(this.data, null, 2) + "\n",
      "utf8"
    );
    this.dirty = false;
  }
}

class TranslationManager {
  private readonly cache: TranslationCache;
  private readonly provider: TranslationProvider;
  private readonly sourceLocale: string;
  private readonly dryRun: boolean;
  private readonly stats: MergeStats;
  private readonly failedLocales = new Set<string>();

  constructor(opts: {
    cache: TranslationCache;
    provider: TranslationProvider;
    sourceLocale: string;
    dryRun: boolean;
    stats: MergeStats;
  }) {
    this.cache = opts.cache;
    this.provider = opts.provider;
    this.sourceLocale = opts.sourceLocale;
    this.dryRun = opts.dryRun;
    this.stats = opts.stats;
  }

  private static hash(locale: string, source: string) {
    return crypto
      .createHash("sha1")
      .update(`${locale}::${source}`)
      .digest("hex");
  }

  async getTranslation(
    locale: string,
    source: string,
    existing?: string
  ): Promise<string> {
    this.stats.stringsProcessed += 1;
    const hash = TranslationManager.hash(locale, source);
    const cached = this.cache.get(locale, hash);
    if (cached !== undefined) {
      this.stats.reusedFromCache += 1;
      return cached;
    }

    if (existing && existing.trim().length > 0) {
      this.cache.set(locale, hash, existing);
      this.stats.reusedExisting += 1;
      return existing;
    }

    if (this.dryRun) {
      const placeholder = `[${locale}] ${source}`;
      this.cache.set(locale, hash, placeholder);
      this.stats.translated += 1;
      return placeholder;
    }

    try {
      const [translated] = await this.provider.translateBatch({
        texts: [source],
        from: this.sourceLocale,
        to: locale,
      });
      const finalText = translated ?? source;
      this.cache.set(locale, hash, finalText);
      this.stats.translated += 1;
      return finalText;
    } catch (error) {
      if (!this.failedLocales.has(locale)) {
        this.failedLocales.add(locale);
        console.error(
          `⚠️  Translation request failed for locale "${locale}". Falling back to source strings.`,
          error
        );
      }
      this.cache.set(locale, hash, source);
      return source;
    }
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.locales.length === 0) {
    console.error("No target locales provided. Use --locales=zh,fr,...");
    process.exit(1);
  }

  const provider = await createProvider(options.provider);
  const cache = new TranslationCache(options.cachePath);
  await cache.load();

  const englishFiles = await collectEnglishFiles(
    options.messagesRoot,
    options.sourceLocale
  );

  if (englishFiles.length === 0) {
    console.error(
      `No ${options.sourceLocale}.ts files found under ${options.messagesRoot}`
    );
    process.exit(1);
  }

  for (const locale of options.locales) {
    const stats: MergeStats = {
      stringsProcessed: 0,
      reusedFromCache: 0,
      reusedExisting: 0,
      translated: 0,
    };
    console.log(
      `\nProcessing locale "${locale}" using provider "${provider.name}"...`
    );
    const manager = new TranslationManager({
      cache,
      provider,
      sourceLocale: options.sourceLocale,
      dryRun: options.dryRun,
      stats,
    });

    for (const englishFile of englishFiles) {
      await processFile({
        englishFile,
        locale,
        sourceLocale: options.sourceLocale,
        manager,
        dryRun: options.dryRun,
      });
    }

    console.log(
      `Locale ${locale}: ${stats.stringsProcessed} strings processed (translated: ${stats.translated}, cache: ${stats.reusedFromCache}, reused existing: ${stats.reusedExisting})`
    );
  }

  await cache.save();
}

type ProcessFileArgs = {
  englishFile: string;
  locale: string;
  sourceLocale: string;
  manager: TranslationManager;
  dryRun: boolean;
};

async function processFile({
  englishFile,
  locale,
  manager,
  dryRun,
  sourceLocale,
}: ProcessFileArgs) {
  const targetFile = englishFile.replace(`${sourceLocale}.ts`, `${locale}.ts`);
  const targetExists = existsSync(targetFile);

  const englishModulePromise = importModule<LocaleTree>(englishFile);
  const targetModulePromise = targetExists
    ? importModule<LocaleTree>(targetFile)
    : Promise.resolve({});

  const [englishModule, targetModule] = await Promise.all([
    englishModulePromise,
    targetModulePromise,
  ]);

  const merged = await mergeLocaleTrees({
    source: englishModule,
    target: targetModule,
    locale,
    manager,
    pathStack: [],
  });

  const englishSourceCode = await fs.readFile(englishFile, "utf8");
  const targetSourceCode = targetExists
    ? await fs.readFile(targetFile, "utf8")
    : "";

  const generated = buildLocaleFile({
    englishSourceCode,
    locale,
    sourceLocale,
    data: merged,
  });

  if (targetExists && generated === targetSourceCode) {
    console.log(`  • ${relativePath(targetFile)} unchanged`);
    return;
  }

  if (dryRun) {
    const action = targetExists ? "updated" : "created";
    console.log(`  • ${relativePath(targetFile)} would be ${action} (dry run)`);
    return;
  }

  await fs.mkdir(path.dirname(targetFile), { recursive: true });
  await fs.writeFile(targetFile, generated, "utf8");
  console.log(
    `  • ${targetExists ? "Updated" : "Created"} ${relativePath(targetFile)}`
  );
}

async function mergeLocaleTrees(args: {
  source: unknown;
  target: unknown;
  locale: string;
  manager: TranslationManager;
  pathStack: Array<string>;
}): Promise<unknown> {
  const { source, target, locale, manager, pathStack } = args;

  if (typeof source === "string") {
    const currentKey = pathStack[pathStack.length - 1];
    if (currentKey && RESERVED_KEYS.has(currentKey)) {
      return typeof target === "string" ? target : source;
    }
    const existing = typeof target === "string" ? target : undefined;
    return manager.getTranslation(locale, source, existing);
  }

  if (Array.isArray(source)) {
    const targetArray = Array.isArray(target) ? target : [];
    const results = [];
    for (let index = 0; index < source.length; index += 1) {
      const merged = await mergeLocaleTrees({
        source: source[index],
        target: targetArray[index],
        locale,
        manager,
        pathStack: [...pathStack, String(index)],
      });
      results.push(merged);
    }
    return results;
  }

  if (source && typeof source === "object") {
    const sourceRecord = source as Record<string, unknown>;
    const targetRecord = (
      target && typeof target === "object" ? target : {}
    ) as Record<string, unknown>;
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(sourceRecord)) {
      result[key] = await mergeLocaleTrees({
        source: sourceRecord[key],
        target: targetRecord[key],
        locale,
        manager,
        pathStack: [...pathStack, key],
      });
    }
    return result;
  }

  return source;
}

async function importModule<T>(absoluteTsPath: string): Promise<T> {
  const moduleUrl = pathToFileURL(absoluteTsPath).href;
  const imported = await import(moduleUrl);
  return (imported.default ?? imported) as T;
}

function buildLocaleFile(args: {
  englishSourceCode: string;
  locale: string;
  sourceLocale: string;
  data: unknown;
}): string {
  const { englishSourceCode, locale, sourceLocale, data } = args;
  const header = extractHeader(englishSourceCode);
  const meta = extractConstMeta(englishSourceCode);
  const varName = deriveConstName(meta.exportedName, locale, sourceLocale);
  const typeAnnotation = meta.typeAnnotation
    ? `: ${meta.typeAnnotation.trim()}`
    : "";
  const serialized = JSON.stringify(data, null, 2);
  const body = `const ${varName}${typeAnnotation} = ${serialized} as const;\n\nexport default ${varName};\n`;
  if (header.trim().length === 0) {
    return `${body}`;
  }
  return `${header}\n\n${body}`;
}

function extractHeader(source: string): string {
  const lines = source.split("\n");
  const headerLines: string[] = [];
  for (const line of lines) {
    if (
      line.trim().startsWith("const ") ||
      line.trim().startsWith("export default")
    ) {
      break;
    }
    headerLines.push(line);
  }
  const trimmed = headerLines.join("\n").trim();
  return trimmed.length > 0 ? trimmed : "";
}

function extractConstMeta(source: string): {
  exportedName: string;
  typeAnnotation?: string;
} {
  const exportMatch = source.match(/export\s+default\s+([A-Za-z0-9_]+)/);
  const exportedName = exportMatch?.[1] ?? "localeData";
  const constRegex = new RegExp(
    `const\\s+${exportedName}\\s*(?::\\s*([^=]+))?=`
  );
  const constMatch = source.match(constRegex);
  const typeAnnotation = constMatch?.[1];
  return { exportedName, typeAnnotation };
}

function deriveConstName(
  exportedName: string,
  targetLocale: string,
  sourceLocale: string
): string {
  const normalizedTarget = normalizeLocaleToken(targetLocale);
  const normalizedPascal = toPascalCase(targetLocale);
  const normalizedUpper = targetLocale.replace(/[-_]/g, "_").toUpperCase();

  if (exportedName.toLowerCase() === sourceLocale.toLowerCase()) {
    return normalizedTarget;
  }
  if (exportedName.endsWith("En")) {
    return exportedName.slice(0, -2) + normalizedPascal;
  }
  if (exportedName.endsWith("EN")) {
    return exportedName.slice(0, -2) + normalizedUpper;
  }
  if (exportedName.endsWith("en")) {
    return exportedName.slice(0, -2) + normalizedTarget;
  }
  return `${exportedName}_${normalizedTarget}`;
}

function normalizeLocaleToken(locale: string): string {
  const parts = locale.split(/[-_]/);
  if (parts.length === 1) {
    return parts[0];
  }
  return [
    parts[0],
    ...parts
      .slice(1)
      .map(
        (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
      ),
  ].join("");
}

function toPascalCase(locale: string): string {
  return locale
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");
}

async function collectEnglishFiles(
  root: string,
  sourceLocale: string
): Promise<string[]> {
  const results: string[] = [];
  async function walk(directory: string) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (entry.name === "types") {
          continue;
        }
        await walk(path.join(directory, entry.name));
      } else if (entry.isFile()) {
        if (entry.name === `${sourceLocale}.ts`) {
          results.push(path.join(directory, entry.name));
        }
      }
    }
  }
  await walk(root);
  results.sort();
  return results;
}

function parseArgs(argv: string[]): CliOptions {
  const defaults: CliOptions = {
    sourceLocale: "en",
    locales: [],
    messagesRoot: path.resolve("src/messages"),
    provider: process.env.TRANSLATION_PROVIDER ?? "passthrough",
    dryRun: false,
    cachePath: path.resolve(".cache/i18n-cache.json"),
  };

  const result = { ...defaults };

  for (const arg of argv) {
    if (arg.startsWith("--locales=")) {
      result.locales = arg
        .slice("--locales=".length)
        .split(",")
        .map((locale) => locale.trim())
        .filter(Boolean);
    } else if (arg.startsWith("--source=")) {
      result.sourceLocale = arg.slice("--source=".length);
    } else if (arg.startsWith("--messages-root=")) {
      result.messagesRoot = path.resolve(arg.slice("--messages-root=".length));
    } else if (arg.startsWith("--provider=")) {
      result.provider = arg.slice("--provider=".length);
    } else if (arg === "--dry-run") {
      result.dryRun = true;
    } else if (arg.startsWith("--cache=")) {
      result.cachePath = path.resolve(arg.slice("--cache=".length));
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }
  }

  return result;
}

function printHelp() {
  console.log(`Usage: tsx scripts/i18n/generate.ts --locales=zh,fr [options]

Options:
  --locales=<list>        Comma-separated list of target locales (required)
  --source=<locale>       Source locale to treat as canonical (default: en)
  --messages-root=<path>  Root directory of message bundles (default: src/messages)
  --provider=<name>       Translation provider (passthrough | azure | google) (default: passthrough)
  --cache=<path>          Translation cache file (default: .cache/i18n-cache.json)
  --dry-run               Do not write files; report planned changes
  --help                  Show this help message
`);
}

async function createProvider(name: string): Promise<TranslationProvider> {
  const normalized = name.toLowerCase();
  if (normalized === "azure") {
    const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT;
    const key = process.env.AZURE_TRANSLATOR_KEY;
    const region = process.env.AZURE_TRANSLATOR_REGION;
    if (!endpoint || !key) {
      console.warn(
        "Azure translator requires AZURE_TRANSLATOR_ENDPOINT and AZURE_TRANSLATOR_KEY. Falling back to passthrough provider."
      );
      return new PassthroughProvider();
    }
    return new AzureTranslator({ endpoint, key, region });
  }

  if (normalized === "google") {
    const apiKey =
      process.env.GOOGLE_TRANSLATE_API_KEY ?? process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.warn(
        "Google Translate provider requires GOOGLE_TRANSLATE_API_KEY (or GOOGLE_API_KEY). Falling back to passthrough provider."
      );
      return new PassthroughProvider();
    }
    return new GoogleTranslator(apiKey);
  }

  if (normalized !== "passthrough") {
    console.warn(`Unknown provider "${name}". Falling back to passthrough.`);
  }
  return new PassthroughProvider();
}

function relativePath(filePath: string) {
  return path.relative(process.cwd(), filePath);
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x2F;/g, "/");
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
