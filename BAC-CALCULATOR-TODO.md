# BAC Calculator 开发 Todo List（可直接执行版）

> 说明：按阶段拆解，勾完所有任务即可完成从模板站 → 完整 BAC Calculator 站点的落地。  
> 不区分具体负责人，后续可以在每一项后添加负责人/截止日期。

---

## 阶段 0：项目准备 & 基础配置

- [x] 在任务管理工具中创建项目（复制本 Todo 作为任务列表）
- [x] 确认域名、品牌名称（站点名、Logo 风格等）
- [x] 确认主要目标市场（默认美国，兼顾 UK / AU / CA / NZ）
- [x] 配置 `.env.local` 中的基础变量（至少 `NEXT_PUBLIC_SITE_URL`）
- [ ] 安装依赖并跑通本地开发：`npm install` + `npm run dev`（当前云端环境缺少 npm，需在本地或 CI 环境执行）

---

## 阶段 1：文案与元数据基础（不写功能，只改文案）

### 1.1 全局文案配置

- [x] 打开 `src/messages/en.ts`，完成以下内容更新：
  - [x] `metadata.title`：围绕 “BAC Calculator – Free Blood Alcohol Calculator” 编写
  - [x] `metadata.description`：突出“安全、估算、勿用于决定是否驾驶”等
  - [x] `metadata.siteName`：确定站点品牌名（如 “SafeBAC Calculator”）
  - [x] `metadata.keywords`：列出主关键词和变体（bac calculator, blood alcohol calculator, etc.）
- [x] 更新 `home.title` 为完整 H1 文案（主 BAC 计算器）
- [x] 更新 `home.description` 为 1–2 句价值主张文案
- [x] 更新 `home.placeholderTitle` / `home.placeholderDescription` 为 “BAC Calculator 正在开发” 相关描述（暂时仍使用占位）
- [x] 更新 `home.about*` 系列字段，对应计划中 Docs 区的 4–6 个小节（What is BAC / How it works / Limitations / Legal limits / Effects / Safety）
- [x] 为 `home.faqQ*` / `home.faqA*` 6 组 FAQ 填入与 BAC 相关的问题与回答
- [x] 更新 `home.ctaTitle` / `home.ctaDescription` / `home.ctaButton` 为以“检查 BAC / 不要酒驾”为主题的 CTA

### 1.2 首页 SEO 元数据校对

- [x] 检查 `src/app/[locale]/page.tsx` 中 `generateMetadata`：确保使用的是更新后的 `metadata` 文案
- [x] 确认 `openGraph`、`twitter` 中的标题与描述与新品牌一致
- [x] 设计并准备一张通用 og-image（如 `og-image.svg`，含工具名称与“BAC Calculator”字样），放到 `public/` 并与元数据字段对应

---

## 阶段 2：首页结构与内容调整（仍使用占位工具）

> 目标：在核心布局不变的前提下，让首页已经完整表达“这是一个 BAC 计算器站点”，即使工具尚未上线。

- [x] 调整首页 Hero 区文本：  
  - [x] H1：替换为“Blood Alcohol Concentration (BAC) Calculator – Check Your Estimated Level Before You Drive” 或最终版本  
  - [x] 副标题：强调“免费、隐私友好、帮助判断风险但不能作为法律依据”
- [x] 调整 CTA 区文本：  
  - [x] 标题：例如 “Check Your BAC Before You Decide to Drive”  
  - [x] 描述：强调安全与合法性  
  - [x] 按钮文本：如 “Estimate My BAC”
- [x] 根据 `BAC-CALCULATOR-PLAN.md` 中的文档结构，准备一个 Markdown 草稿（可先放在 `docs/bac-docs.md` 或直接写在 `page.tsx` 中）
- [x] 使用 `MarkdownContent` 渲染该草稿，确保结构为：  
  - [x] What is BAC?  
  - [x] How this calculator works (即将上线)  
  - [x] Limitations & accuracy  
  - [x] Legal limits overview  
  - [x] Effects at different BAC levels  
  - [x] Safety first
- [x] 更新 FAQ 区内容为 BAC 相关（准确性、时间到清醒、是否可以用来判断能否开车等）
- [x] 检查 `WebApplication` JSON‑LD（`webAppSchema`）：  
  - [x] name/description/url 更新为 BAC 计算器  
  - [x] `applicationCategory` 设置为如 “HealthApplication” 或 “WebApplication” 中更贴切的值（可保持当前）

---

## 阶段 3：核心数据与规则整理（准备好计算所需的“常量”）

> 此阶段不写计算逻辑，只收集并整理数据，写入文档或常量规划文件。

- [x] 确定采用的 BAC 计算公式（如 Widmark），整理主要文献与链接
- [x] 记录公式所需参数与单位：  
  - [x] 酒精总量 = ∑(饮品体积 × ABV × 酒精密度)  
  - [x] 分布容积（男性/女性）  
  - [x] 代谢速率（每小时下降多少）
- [x] 为下列内容创建一个规划文件（如 `docs/bac-data-notes.md`）：  
  - [x] 常见酒种类别（Beer/Wine/Spirits/Custom）及默认 ABV  
  - [x] 常用杯型/瓶型容量选项  
  - [x] 各国家/地区的法定 BAC 上限（至少 US/UK/AU/CA/NZ/Maroc/DZ）  
  - [x] 各单位的换算关系（% ↔ ‰ ↔ mg/dL 等）
- [x] 在文档中规划风险等级区间：  
  - [x] 低/中/高风险 BAC 阈值（例如 <0.03 / 0.03–0.079 / ≥0.08）  
  - [x] 每个区间对应的描述文本（行为表现 + 驾驶风险）
- [x] 规划 Time‑to‑zero 的估算算法：  
  - [x] 基准代谢速率范围（例如 0.010–0.020 %BAC per hour）  
  - [x] 决定是否使用固定值、区间值或可配置值

---

## 阶段 4：核心 BAC Calculator 组件设计（仅设计，不编码）

> 此阶段输出应该是组件设计文档，例如 `docs/BAC-CALCULATOR-UI-SPEC.md`，为后续开发提供清晰蓝图。

- [x] 定义组件名称与位置：`src/components/BacCalculator.tsx`（名称可调整但文档中统一）
- [x] 在文档中列出组件 props（例如是否需要接收默认地区/参数等）
- [x] 绘制或描述 UI 布局：  
  - [x] 左/上：输入区域  
  - [x] 右/下：结果区域  
  - [x] 单列还是双列布局（考虑移动端）
- [x] 明确所有输入字段：  
  - [x] 性别选择（Radio）  
  - [x] 体重输入 + 单位切换（kg/lb）  
  - [x] 地区选择（Country / Region 下拉）  
  - [x] 饮酒开始时间 + 当前时间（或持续时长）  
  - [x] 饮品列表：每行包含饮品类型、数量、容量、ABV  
  - [x] 添加/删除饮品行按钮
- [x] 明确所有输出字段：  
  - [x] 当前估算 BAC 值（默认 %，可切换单位）  
  - [x] 风险等级标签（颜色 + 文案）  
  - [x] 与当地法定上限对比的文字说明  
  - [x] 明确的行为建议（Do NOT drive / etc.）  
  - [x] Time‑to‑zero 估算信息（例如 “~X–Y hours to reach 0.00%”）
- [x] 定义交互细节：  
  - [x] 点击 “Calculate” 按钮触发计算  
  - [x] 输入校验与错误提示（例如非法数值、缺失必填项）  
  - [x] 重置/清空按钮行为  
  - [x] 是否采用自动实时计算（输入改变时）或仅在按下按钮后计算
- [x] 规划本地存储策略：  
  - [x] 哪些字段可以保存为默认值（体重、性别、地区等）  
  - [x] 用户如何清除这些数据
- [x] 在文档中定义无障碍与可用性要求：  
  - [x] 键盘可访问  
  - [x] 屏幕阅读器友好的标签与 aria 属性  
  - [x] 清晰的错误信息文本

---

## 阶段 5：次级工具与页面规划（不编码）

> 对应 `BAC-CALCULATOR-PLAN.md` 中的长尾与专题页面。

- [x] 为 `/bac-time-to-zero-calculator` 撰写页面规格文档：  
  - [x] 明确输入方式（当前估算 BAC 或饮酒信息）  
  - [x] 明确输出形式（时间线文本/简单图表）  
  - [x] 对 Time‑to‑zero 估算的限制说明
- [x] 为 `/how-to-calculate-bac` 撰写大纲：  
  - [x] H1 / H2 / H3 标题结构  
  - [x] Where to embed a mini calculator（如只包含酒精/体重/时间的简化版）  
  - [x] 示例计算（文字层面）
- [x] 为 `/most-accurate-bac-calculator` 撰写大纲：  
  - [x] 比较不同在线 BAC 工具的因素（公式、输入粒度等）  
  - [x] 解释为什么“最准确”本质上仍是估算  
  - [x] 强化安全与责任声明
- [x] 为国家版本页面 `/bac-calculator-[country]` 设计统一模板：  
  - [x] H1：包含国家名称  
  - [x] 当地法定上限表格与法律引用链接  
  - [x] 本地化提示（如零容忍政策、职业司机特殊标准）  
  - [x] 内嵌与首页同样的 Calculator，但默认地区为该国
- [x] 为单位转换工具页面（`/promille-to-bac`, `/mgdl-to-bac`, `/bac-conversion-calculator`）整理：  
  - [x] 每页 H1 / 描述草案  
  - [x] 输入/输出字段定义  
  - [x] 转换公式说明与参考来源

---

## 阶段 6：SEO 与结构化数据规划

> 目标：在真正编码前，就明确每个页面应具备的 SEO 元素与 schema 类型。

- [x] 为首页确定最终 `<title>` 与 `<meta description>` 文案（记录在文档中）  
- [x] 为以下每个规划页面草拟 title / description：  
  - [x] `/bac-time-to-zero-calculator`  
  - [x] `/how-to-calculate-bac`  
  - [x] `/most-accurate-bac-calculator`  
  - [x] 每个国家特定页面  
  - [x] 单位转换页面
- [x] 为首页和每个主要页面决定使用的 JSON‑LD 类型：  
  - [x] 首页：`WebApplication` + `FAQPage`  
  - [x] How‑to 页面：`HowTo` + `Article`  
  - [x] Accuracy 页面：`Article`  
  - [x] 单位转换页：`WebApplication` 或 `Calculator`（如适用）
- [x] 定义 FAQ 内容与 FAQPage schema 对应关系（已有 FAQ 组件，确保问题列表完整）
- [x] 列出所有需要的内部链接关系（例如从 How‑to 页链接回首页工具等）

---

## 阶段 7：法律与 E‑E‑A‑T 内容准备

> 此阶段主要是文案与结构规划，不涉及前端实现细节。

- [x] 审核并更新以下页面文案（目前模板中已有）：  
  - [x] `src/app/[locale]/privacy/page.tsx`  
  - [x] `src/app/[locale]/terms/page.tsx`  
  - [x] `src/app/[locale]/disclaimer/page.tsx`
- [x] 在免责声明中明确加入以下要点：  
  - [x] 工具仅为教育与信息用途  
  - [x] 不构成医疗、法律或任何专业建议  
  - [x] 不可用于决定是否驾驶或从事高风险活动  
  - [x] 推荐在不确定时永远选择不驾驶，并咨询专业人士
- [x] 准备站点“关于我们 / 审核流程”文案（可在后续新增页面使用）：  
  - [x] 作者背景描述  
  - [x] 医疗审核（若有）和法律审核人员的简介  
  - [x] 内容更新频率与审查流程描述
- [x] 整理权威引用来源清单（NIH、CDC、WHO、各国交通管理局等），用作 Docs 与页面底部的参考文献

---

## 阶段 8：性能、体验与无障碍要求清单

> 开发阶段要对照本清单验证。

- [x] 定义移动端首屏布局（工具是否在首屏完全可见）  
- [x] 确定按钮尺寸、文字大小等 UX 标准（参照 TOOL-SITE-ESSENTIALS.md）  
- [x] 从一开始就要求：  
  - [x] 所有图片都必须有 alt 文本  
  - [x] 表单控件必须有 label  
  - [x] 主要交互可通过键盘操作完成  
- [x] 明确性能目标：  
  - [x] 移动端 LCP < 2.5s（以 PageSpeed 报告为准）  
  - [x] 初次加载 JS 体积尽量控制在合理范围内（避免不必要依赖）
- [x] 规划首轮测试列表：  
  - [x] Chrome / Safari / Firefox / Edge  
  - [x] iOS / Android 主流屏幕尺寸  
  - [x] 无痕模式下的行为（无 localStorage 既有数据）

---

## 阶段 9：上线前综合检查（最终阶段）

> 真正写完代码后，对照此清单逐项检查。

- [ ] 工具功能：  
  - [ ] 所有输入组合都能正常计算  
  - [ ] 错误输入有清晰提示  
  - [ ] Time‑to‑zero 结果合理且与 Docs 描述一致  
  - [ ] 单位切换正确无误
- [ ] 内容：  
  - [ ] 所有页面已替换占位内容  
  - [ ] FAQ 完整且无明显重复  
  - [ ] 引用来源与链接正确可访问  
  - [ ] 所有文案已校对（语法与法律风险）
- [ ] SEO：  
  - [ ] 每个页面的 title/description 唯一且长度合理  
  - [ ] JSON‑LD 通过 Google Rich Results Test 检验  
  - [ ] sitemap 和 robots.txt 正确生成  
  - [ ] 404 页面存在且样式合理
- [ ] 法律与隐私：  
  - [ ] 隐私、条款、免责声明页面均可从 Footer 访问  
  - [ ] 免责声明在工具附近也有简短版本提示  
  - [ ] 若使用 Cookie/Analytics，视地区情况配置告知/同意弹窗
- [ ] 性能与体验：  
  - [ ] 通过 Lighthouse 基础审查（性能、可访问性、SEO 得分都在目标范围）  
  - [ ] 移动端操作流畅，无遮挡/溢出  
  - [ ] 所有按钮/链接明显可点击
- [ ] 分析与监控：  
  - [ ] Google Analytics 正常收集数据（含 calculate 事件）  
  - [ ] Google Search Console 已验证站点并提交 sitemap  
  - [ ] 若投放 AdSense，确认广告数量与位置不影响工具使用

---

以上 Todo 覆盖了从文案、数据准备、UX 设计、SEO/E‑E‑A‑T 规划到最终检查的所有关键点。  
后续开发时，只需按阶段顺序依次勾选，即可完整落地 `BAC-CALCULATOR-PLAN.md` 中的方案。 
