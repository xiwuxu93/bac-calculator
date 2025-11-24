# BAC Calculator SEO 与结构化数据规划

> 目的：在正式编码和上线前，统一规划各页面的标题、描述、URL 结构、内链以及 JSON‑LD Schema 使用方式。

---

## 1. 站点级别设置

### 1.1 基本信息

- 站点名（siteName）：`SafeBAC Calculator`
- 主 URL：`${NEXT_PUBLIC_SITE_URL}`（开发环境默认为 `http://localhost:3000`）
- 主语言：英文（en）

### 1.2 全局 SEO 要点

- 每个页面都应设置：
  - 唯一的 `<title>`（50–60 字符）
  - 清晰的 `<meta description>`（150–160 字符）
  - 规范化链接（`canonical`）
  - Open Graph（OG）与 Twitter Card 元数据（统一使用 `og-image.svg`）
- 保持工具优先的页面结构：  
  - H1 = 页面主目标关键词  
  - 工具组件紧随其后（以上折线区域）  
  - 说明文档与 FAQ 放在下方

---

## 2. 关键页面 Title / Description 草案

> 文案为草案，后续可根据 Search Console 数据优化。

### 2.1 首页 `/` – BAC Calculator

- Title：  
  - `BAC Calculator – Free Blood Alcohol Content Estimator | SafeBAC`  
- Description：  
  - `Free online BAC calculator to estimate your blood alcohol concentration based on drinks, body weight, and time. See clear legal risk warnings and why you should never use BAC calculators to decide if you can drive.`

JSON‑LD：
- `WebApplication`（已在首页实现）  
- `FAQPage`（通过 FAQ 组件自动注入）

### 2.2 `/bac-time-to-zero-calculator`

- Title：  
  - `BAC Time to Zero Calculator – How Long Until You Are Sober?`  
- Description：  
  - `Estimate how long it may take for your blood alcohol concentration (BAC) to return to zero. Learn why time-to-zero is only a rough estimate and why you still should not drive after drinking.`

JSON‑LD：  
- `WebApplication` 或 `SoftwareApplication`（工具本身）  
- 可选：`FAQPage`

### 2.3 `/how-to-calculate-bac`

- Title：  
  - `How to Calculate BAC – Blood Alcohol Content Formula Explained`  
- Description：  
  - `Learn how to calculate blood alcohol concentration (BAC) step by step using standard formulas. See worked examples, key assumptions, and why online BAC calculators are only estimates.`

JSON‑LD：  
- `HowTo`（步骤式解释）  
- `Article`

### 2.4 `/most-accurate-bac-calculator`

- Title：  
  - `Most Accurate BAC Calculator? Understanding Accuracy and Limitations`  
- Description：  
  - `Find out how accurate BAC calculators really are, what affects their results, and why even the most advanced online BAC estimator cannot replace professional testing or legal advice.`

JSON‑LD：  
- `Article`

### 2.5 国家版本 `/bac-calculator-[country]`

以 UK 为例：

- URL：`/bac-calculator-uk`
- Title：  
  - `BAC Calculator UK – Blood Alcohol Limit and Drink-Driving Risks`  
- Description：  
  - `Estimate your BAC with a UK-focused calculator and see how it compares to the legal drink-driving limit. Learn about UK blood alcohol limits and why you should not drive after drinking.`

其他国家（AU / NZ / CA / Maroc / DZ）按类似模式，替换国家名称与法律背景关键词。

JSON‑LD：  
- `WebApplication`（同首页）  
- 可附加 `FAQPage`（包含本地法律相关提问）

### 2.6 单位转换页面

示例 `/promille-to-bac`：

- Title：  
  - `Promille to BAC Converter – ‰ to % and mg/dL`  
- Description：  
  - `Convert blood alcohol from promille (‰) to percent BAC and mg/dL. Simple online BAC unit converter with explanations of what each unit means.`

`/mgdl-to-bac` 与 `/bac-conversion-calculator` 类似，标题与描述围绕“unit conversion / BAC units explained”。

JSON‑LD：  
- `WebApplication` 或 `SoftwareApplication`

---

## 3. Schema 使用规划

### 3.1 类型选择

- 首页 `/`：  
  - `WebApplication`（类型）  
  - `FAQPage`  
- How‑to 页面：  
  - `HowTo` + `Article`  
- Accuracy 页面：  
  - `Article`  
- Time‑to‑zero 页面：  
  - `WebApplication` + 可选 `FAQPage`  
- 国家页面：  
  - `WebApplication` + `FAQPage`（本地法律问题）  
- 单位转换页面：  
  - `WebApplication` 或 `SoftwareApplication`

### 3.2 FAQPage 细节

- 首页 FAQ：围绕工具用途、是否可用于决定驾驶、数据安全、准确性等。  
- Time‑to‑zero FAQ：围绕“能否加速代谢”“睡觉/喝咖啡是否有用”等。  
- How‑to FAQ：围绕公式差异、为何不同工具结果不同。  
- 国家页面 FAQ：围绕当地 drink‑driving limit、特殊人群、主要惩罚类型。

> 所有 FAQ 内容都要在回答中强调“不构成法律或医疗建议”。

---

## 4. 内链结构规划

### 4.1 导航级别

- Header：  
  - Home（BAC Calculator）  
  - Time to Zero  
  - How It Works（指向 `/how-to-calculate-bac`）  
  - Accuracy（指向 `/most-accurate-bac-calculator`）

### 4.2 正文内链

- 首页文档区：  
  - 在介绍 time‑to‑zero 时链接到 `/bac-time-to-zero-calculator`。  
  - 在解释公式时链接到 `/how-to-calculate-bac`。  
  - 在谈到准确性时链接到 `/most-accurate-bac-calculator`。

- How‑to 页面：  
  - 在示例计算完成后提供按钮“Try this in the full BAC calculator”链接回首页。  

- Accuracy 页面：  
  - 在分析其他工具时，强调本工具的优势并链接回首页。  

- 国家页面：  
  - 提供“Switch country”区域，链接到其他国家页面。  
  - 在法律段落中，链接到官方政府站点。

### 4.3 Footer 内链

- 保持已有的隐私、条款、免责声明链接。  
- 可新增“About / Methodology”链接（当页面上线后）。

---

## 5. 技术 SEO 细节

### 5.1 robots 与 sitemap

- `robots.ts` 保持允许抓取所有公开页面。  
- `sitemap.ts` 中应包含：  
  - 首页  
  - 所有次级工具与专题页面  
  - 法律页面（privacy, terms, disclaimer）  
  - 国家版本页面

### 5.2 URL 约定

- 使用小写、短横线分隔。  
- 只要可能，使用 `.tsx` 中的路径与 URL 一一对应。  
- 避免在 URL 中出现数字版本号（如 `2024`），除非有强需求。

### 5.3 其它

- 图片：  
  - 所有非装饰性图片必须有 `alt` 文本。  
  - Open Graph 使用的图像为 `og-image.svg`，保持文本“SafeBAC Calculator – BAC Calculator”。
- 结构化数据输出：  
  - 尽量使用 `JSON.stringify(schema)` 注入 `<script type="application/ld+json">`。  
  - 控制脚本数量，避免重复注入同一类型。

---

## 6. 日后优化方向

- 根据 Search Console 数据调整各页面 title/description，提升 CTR。  
- 为表现好的长尾查询（例如某些具体国家/问题）单独拆页面，扩展专题。  
+- 探索在 FAQ 与文档中增加更多“People Also Ask” 风格的问题，以争取特色摘要。  

本文件为规划文档，后续在实现各页面时需同步更新，如有结构变更也应回写本文件。 

