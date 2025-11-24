## Internationalization Automation Workflow

This project treats the English bundles as the single source of truth.  
Use the translation generator to keep every other locale in sync.

### Command

```bash
npm run i18n:generate -- --locales=zh
```

Key flags:

- `--locales=zh,fr` – required comma‑separated list of target locales.
- `--dry-run` – preview changes without touching files.
- `--provider=azure` – choose a translation provider (defaults to passthrough).
- `--cache=./.cache/i18n-cache.json` – override the cache file path.
- `--messages-root=./src/messages` – change the root directory if needed.

### Provider configuration

The generator supports pluggable providers. Two are available today:

| Provider        | How to enable | Notes |
|-----------------|---------------|-------|
| `passthrough`   | default       | Keeps existing translations; useful for diffing or manual edits. |
| `azure`         | set `TRANSLATION_PROVIDER=azure`, `AZURE_TRANSLATOR_ENDPOINT`, `AZURE_TRANSLATOR_KEY`, optionally `AZURE_TRANSLATOR_REGION` | Calls Microsoft Translator Text API v3. |
| `google`        | set `TRANSLATION_PROVIDER=google`, `GOOGLE_TRANSLATE_API_KEY` (or `GOOGLE_API_KEY`) | Uses Google Cloud Translation (v2 REST). |

You can also pass `--provider=` on the command line. Missing or invalid credentials automatically fall back to the passthrough provider so automation never blocks local work.

### Incremental updates

1. The script walks every `en.ts` bundle under `src/messages/**`.  
2. For each target locale it merges **only** the strings that changed or were added in English. Missing locale files are generated automatically.  
3. Existing translations are preserved and stored in a translation cache (`.cache/i18n-cache.json`).  
4. New or updated English strings call the provider (unless the cache already has the translation) and the locale file is regenerated with the updated content.  
5. If `--dry-run` is supplied, the script reports the files that would change or be created without writing them.

The cache keeps previously reviewed translations so that re-running the generator does not re-translate unchanged copy.

### Review checklist

- Run with `--dry-run` first to inspect planned changes.  
- After generating, scan the Git diff. Only keys that changed in English should show updates in the target locale.  
- Use the cache file for auditing or sharing translation memory; it is ignored by Git by default.  
- If you manually tweak a translation, run the generator again so the cache captures the new text.

This workflow lets the team focus on English during development and automate the heavy lifting of keeping localized bundles aligned. A final human or LLM QA pass is still recommended for clinical copy.
