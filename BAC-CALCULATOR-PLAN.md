# BAC Calculator 项目整体方案（基于工具站模板）

> 目标：在「bac calculator」及相关长尾词上，打造一个 **安全导向、专业可信、体验极佳** 的英文 BAC 计算器站点，逐步具备与 calculator.net 等站点竞争 Top5–Top3 的实力。

---

## 1. 项目定位与目标

- **核心定位**：  
  - “Most safety‑focused & well‑explained BAC calculator”——不仅给数字，更给清晰的风险判断和行为建议。  
  - 面向全球英语用户，以美国为主，兼顾 UK / AU / CA / NZ 等主要英语国家的法律差异。
- **业务目标**：  
  - 12 个月内，主站 `/`（BAC Calculator）在「bac calculator」进入 Top 10，相关长尾词覆盖 50+。  
  - 3–6 个月内，在 「how to calculate bac」「bac time to zero calculator」「most accurate bac calculator」 等长尾词上争取 Top3。
- **产品原则**（与模板完全适配）：  
  - 工具优先：首屏即 Calculator，无干扰。  
  - 内容简洁但专业：工具 + 简明解释 + FAQ。  
  - 高度安全导向：宁可“吓人一点”，也不安慰式输出。

---

## 2. 用户意图与画像（简版）

- **核心意图**：  
  - 判断自己（或他人）饮酒后的 **安全性与合法性**——尤其是“能不能开车”“多久能清醒”。  
  - 需要一个“看得懂、相信得过”的结果，而不是单纯数字。
- **主要人群 & 场景**：  
  - 聚会后考虑是否开车的人（手机端占大多数）。  
  - 对法律 / 驾照考试 / 医学学习有需求的人（需要公式与更严谨解释）。  
  - 关心家人朋友安全的人，需要“可以拿来劝阻别人的证据”。  
  - 法律/医疗/保险相关从业者，用作快速估算参考。

---

## 3. 竞争格局与差异化方向

### 3.1 SERP 概况

- Top10 主要由：  
  - 综合工具站：`calculator.net`（DR 很高）  
  - 医疗/戒酒机构：`alcohol.org`、`responsibility.org`  
  - 大学 / 政府：`iu.edu`、`nih.gov`  
  - 律师事务所：酒驾相关 law firm 页面
- 特征：典型 **YMYL** 场景，Google 偏好 **权威机构 + 工具型页面** 组合。

### 3.2 calculator.net 优劣

- 优点：  
  - 域名权重高、历史久、内链强。  
  - 工具功能完整（性别、体重、时间、各类酒）。  
  - 有较长的科普内容与 BAC 区间表。
- 不足（即我们的机会）：  
  - UI 过时，移动端体验一般，广告干扰感强。  
  - 文案风格偏百科，缺少“安全决策导向”的 UX。  
  - 对“最准确算法 / 误差范围”的解释不够突出。  
  - 法律差异、time‑to‑zero 等需求未被专门产品化。

### 3.3 差异化方向

1. **体验优先**：极简、无干扰、移动端优。  
2. **安全导向**：输出总是强调“不确定就不要开车”。  
3. **专业可信**：公开算法、引用权威文献，标注医疗/法律审核。  
4. **需求覆盖更完整**：围绕 time‑to‑zero、most accurate、country‑specific 等长尾做工具+内容集群。

---

## 4. 信息架构（IA）与 URL 规划

模板结构：`src/app/[locale]/page.tsx` 为首页，我们将其视为 **主 BAC 计算器页**。

### 4.1 顶层结构（v1–v2 阶段重点）

- `/`（或 `/en`）：**Blood Alcohol Concentration (BAC) Calculator**  
  - 目标关键词：`bac calculator`, `blood alcohol calculator`, `blood alcohol content calculator`  
  - 内容：主工具 + 简明解释 + FAQ + 强安全提示。
- `/bac-time-to-zero-calculator`  
  - 目标：`bac time to zero calculator`, `time to zero bac calculator`, `when will i be sober bac calculator`。  
  - 功能：输入已知/估算 BAC 或饮酒信息，输出预计时间线。
- `/how-to-calculate-bac`  
  - 目标：`how to calculate bac`, `how to calculate your bac`, `how do you calculate bac levels`, `how is bac calculated` 等。  
  - 内容：公式讲解 + 手算示例 + 嵌入简化版计算器。
- `/most-accurate-bac-calculator`  
  - 目标：`most accurate bac calculator`, `are bac calculators accurate`。  
  - 内容：算法比较、误差来源、为何任何在线工具都只能给估算值。
- `/bac-calculator-[country]`（v2+ 按优先级逐步上线）  
  - 如 `bac-calculator-uk`, `bac-calculator-australia`, `bac-calculator-nz`, `bac-calculator-maroc`, `bac-calculator-dz`。  
  - 内容：与主工具共用核心逻辑，只是：  
    - 默认地区 + 法定上限  
    - 当地法律条款摘要  
    - 文化/习惯差异说明。

### 4.2 次级工具与单位转换页（覆盖 CSV 与自动补全长尾）

- `/bac-to-zero-calculator`（可与 time‑to‑zero 合并或 canonical 统一）  
- `/bac-drink-calculator`（从目标 BAC 回推可喝几杯）  
- `/promille-to-bac`、`/bac-to-promille`、`/mgdl-to-bac`  
  - 目标：`promille to bac calculator`, `mg dl to bac calculator` 等。  
  - 形式：简单转换工具 + 对应单位解释。

### 4.3 不相关/弱相关关键词处理

CSV 中含有 `how to calculate bac in project management` 等非酒精相关含义：  
- 不单独做页面，避免主题稀释。  
- 如需覆盖，可在 FAQ 中简单解释“本工具不用于项目管理中的 BAC（Budget at Completion）”并引导离开。

---

## 5. 首页（主 BAC 计算器页）布局方案

基于模板现有结构（Hero → Tool → Docs → FAQ → CTA）：

### 5.1 Hero 区（H1 + 描述）

- **H1 草案**：  
  - “Blood Alcohol Concentration (BAC) Calculator – Check Your Estimated Level Before You Drive”  
- **描述草案**：  
  - “Free, privacy‑friendly BAC calculator to estimate your blood alcohol concentration based on drinks, body weight, and time. Get clear legal risk warnings and see how long it may take to reach zero.”

### 5.2 Tool 区（代替 ContentPlaceholder）

**输入字段设计：**
- 性别：Male / Female（用于分配系数）。  
- 体重：数值 + 单位切换（kg / lb）。  
- 地区：国家 +（后续可加州/省份）下拉，用于匹配法定上限。  
- 饮酒时间：开始时间 + 当前时间 / 持续时长。  
- 酒精摄入：  
  - Beer / Wine / Spirits / Custom  
  - 对每种酒：数量 + 容量（常用规格）+ ABV（预设 + 自定义）。  

**输出内容设计：**
- 当前估算 BAC 值（显示为 %，并可切换为 ‰ / mg/dL）。  
- 颜色标签 + 文案：  
  - 低（仍不建议驾驶）/ 中（高风险）/ 高（极高风险）。  
- 与当地法律上限对比：  
  - “In your region, the legal limit is 0.05%. Your estimated BAC is 0.075% (above the legal limit).”  
- 行为建议：  
  - 清晰结论：`Do NOT drive`, `Still unsafe to drive`, `Legally under the limit but driving is not recommended.`  
- Time‑to‑zero 预估：  
  - 显示“预计 X–Y 小时后降到 0.00% / 法定上限以下”，可用简单时间线或文本。

**安全与免责声明（紧邻结果）：**
- “This is only an estimate. Alcohol affects everyone differently. If you are not sure, do not drive.”  
- “Never use any online BAC calculator to decide whether you can drive.”

### 5.3 Documentation 区（MarkdownContent 提纲）

建议章节（对应 `home.about*` 文案）：

1. **What is Blood Alcohol Concentration (BAC)?**  
   - 简要定义 + 常见单位。  
2. **How This BAC Calculator Works**  
   - 使用的公式（例如 Widmark）及关键参数解释。  
3. **Limitations & Accuracy**  
   - 影响因素：代谢差异、食物、药物、健康状况。  
   - 强调这是估算工具。  
4. **Legal Limits Around the World**  
   - 表格：主国家/地区的上限值。  
5. **Effects at Different BAC Levels**  
   - 分类列表（0.02、0.05、0.08、0.15…）+ 行为与风险。  
6. **Safety First**  
   - 酒驾后果、替代方案（网约车、公共交通）、如有问题联系医生/戒酒机构。

### 5.4 FAQ 区（FAQ 组件内容方向）

示例问题方向：
- How accurate is this BAC calculator?  
- How many drinks will get me to 0.08% BAC?  
- How long does it take for BAC to go back to zero?  
- Can I use this to know if I can drive?  
- Why do women often reach higher BAC than men?  
- What if I am taking medication or have health conditions?

FAQ 文案要尽量短、直接，便于 PAA / Featured Snippet 抓取。

### 5.5 CTA 区

- 标题示例：  
  - “Check Your BAC Before You Decide to Drive”  
- 按钮：  
  - “Estimate My BAC” → `#tool`

---

## 6. 关键词与内容策略（结合 CSV）

### 6.1 关键词分组（cluster）

1. **计算方法 / 公式类**  
   - `how to calculate bac`, `how do you calculate bac`, `how is bac calculated`, `how to calculate your bac level` 等。  
   - 主要落在 `/how-to-calculate-bac` + 首页 Docs 区。
2. **准确性 / 可信度类**  
   - `are bac calculators accurate`, `how accurate are bac calculators`, `are online bac calculators accurate` 等。  
   - 落在 `/most-accurate-bac-calculator` + FAQ。  
3. **时间 / 清醒类**  
   - `how long until bac is 0 calculator`, `when will i be sober bac calculator`, `bac time to zero calculator`, `bac to zero calculator`。  
   - 重点工具页 `/bac-time-to-zero-calculator`。  
4. **饮酒量换算类**  
   - `how many drinks bac calculator`, `how drunk am i bac calculator`, `what's my bac calculator`。  
   - 首页工具 + `/bac-drink-calculator`。  
5. **单位转换 / 专业类**  
   - `mg dl to bac calculator`, `promille to bac calculator`, `bac to promille calculator`, `bac conversion calculator`。  
   - 独立转换工具页 + Docs 中解释。  
6. **地域类**  
   - `bac calculator nz`, `bac calculator australia`, `bac calculator uk`, `bac calculator maroc`, `bac calculator dz` 等。  
   - 专门国家页面，使用同一组件 + 当地法律信息。  
7. **人群 / 特定场景类**  
   - `female bac calculator`, `online bac calculator`, `most accurate bac calculator`。  
   - 可通过主工具 + 专门内容模块解决。

### 6.2 页面映射（简表）

> 说明：这里只做规划，不真正创建路由。

- 首页 `/`：  
  - 目标：`bac calculator`, `blood alcohol calculator`, `online bac calculator`, `what is my bac calculator`, `how drunk am i bac calculator`, `how many drinks bac calculator`。  
  - 形式：主工具 + Docs + FAQ + CTA。
- `/how-to-calculate-bac`：  
  - 目标：所有 “how to / how do you calculate bac” 类词。  
  - 形式：长文教程 + 内嵌简化计算器。  
- `/bac-time-to-zero-calculator`：  
  - 目标：time‑to‑zero / sober 类词。  
  - 形式：专门计算器 + 时间线可视化。  
- `/most-accurate-bac-calculator`：  
  - 目标：accuracy 相关词。  
  - 形式：算法说明 + 对比 + FAQ。  
- `/bac-calculator-[country]`：  
  - 目标：各国家前缀的 bac calculator。  
  - 形式：本地化版本 + 法规内容。  
- `/promille-to-bac` / `/mgdl-to-bac` / `/bac-conversion-calculator`：  
  - 目标：单位转换类词。  
  - 形式：简单转换工具 +表格解释。

---

## 7. SEO 与 E‑E‑A‑T 策略

### 7.1 On‑page 优化

- 在 `src/messages/en.ts` 中配置：  
  - 首页 `metadata.title`、`description`、`keywords` 明确包含主关键词及变体。  
  - 其他页面采用统一模式：`[Page Topic] | BAC Calculator`。  
- `HomePage.generateMetadata` 已有 Open Graph / Twitter 配置，只需填充真实文案。  
- 使用 `FAQ` 组件生成 FAQPage schema，目标 PAA & Rich Results。  
- 保留/优化 `WebApplication` JSON‑LD，描述为 “BAC Calculator – WebApplication”。

### 7.2 E‑E‑A‑T / YMYL

- 计划设置：  
  - 作者与审核者信息：  
    - 作者：产品负责人 / 内容编辑。  
    - 审核：一位拥有资质的医生或成瘾专科 + 一位交通律师（可分阶段上线）。  
  - 在页面底部增加 “Medically reviewed by … / Legally reviewed by …” 区块。  
  - 独立 `/about` 或 “Our review process” 页面，说明审核流程与信息来源。  
- 引用权威来源：  
  - NIH / CDC / WHO / 各国交通管理局官方网站。  
  - 在 Docs 末尾列出参考文献列表。

### 7.3 内链与导航

- Header：  
  - 简洁导航：`BAC Calculator`（首页）、`Time to Zero`、`How It Works`、`Accuracy`。  
- 内文：  
  - Docs 区和相关页面中适当交叉链接：  
    - 从 “How to calculate BAC” 指向首页工具。  
    - 从 “Accuracy” 页指向首页和 time‑to‑zero 页。  
    - 各国家页面之间互链。

### 7.4 性能与技术 SEO

- 保持首页体积轻量：只引入必要脚本。  
- 核心 Web Vitals：  
  - 工具组件首屏加载但避免阻塞（React 客户端组件尽量小）。  
  - 结果展示逻辑在客户端完成，无额外网络请求。  
- 使用 `robots.ts` 与 sitemap 支持自动发现新页面。

---

## 8. 技术实现路线（仅规划，不写代码）

### 阶段 1：基础配置（1–2 天）

1. 更新 `src/messages/en.ts`：  
   - 填写 `metadata` 与 `home` 文案，使其符合 BAC 主题。  
2. 保持首页结构不变，仅替换 Hero 文案和 FAQ 内容为 BAC 相关。  
3. 明确 `NEXT_PUBLIC_SITE_URL`、GA、AdSense 等配置但暂不强依赖。

### 阶段 2：实现核心 BAC Calculator 组件（3–5 天）

> 在 `src/components/` 下规划 `BacCalculator.tsx`（暂不创建），将来替换 `ContentPlaceholder`。

规划要点：
- 采用单组件负责输入 + 输出的交互式表单。  
- 使用可配置的常量文件存放：酒精密度、饮品类型、单位换算、各国法定上限。  
- 计算逻辑与 UI 分离，方便单元测试。  
- 支持个性化默认值（localStorage）。

### 阶段 3：扩展内容页（1–2 周，可并行）

为每个规划的 URL 创建静态页面：
- 使用 `MarkdownContent` 渲染长文解释。  
- 视需要嵌入“简化版工具模块”（如 time‑to‑zero、单位转换）。  
- 统一使用 `Header` + `Footer` 布局与 `generateMetadata` 模式。

### 阶段 4：Schema、Analytics 与合规（2–3 天）

- 为主要页面添加合适的 JSON‑LD：  
  - `WebApplication`、`FAQPage`、`Article`/`HowTo`（用于 how‑to 页面）。  
- 配置 GA 监控：事件追踪（calculate 点击、结果查看）。  
- 校验法律页面（privacy / terms / disclaimer）与 BAC 相关风险提示的一致性。

### 阶段 5：数据驱动迭代（上线后持续）

- 通过 Search Console 与 GA：  
  - 监控长尾曝光与点击情况。  
  - 优化点击率低的 title / description。  
  - 根据查询词补充 FAQ 与新页面。  
- 根据用户行为（停留时间、计算次数）调整默认参数与表单布局。

---

## 9. 里程碑与预估时间线

- **Week 1**  
  - 完成文案基础配置（`en.ts`）、首页文案与 FAQ。  
  - 设计并确认 BAC Calculator 的 UX 交互与字段。  
- **Week 2–3**  
  - 实现并调试核心 `BacCalculator` 组件。  
  - 完成 basic time‑to‑zero 逻辑。  
  - 添加基础 Disclaimer 与页面内安全提示。  
- **Week 4–6**  
  - 上线 `how-to-calculate-bac`、`most-accurate-bac-calculator`、`bac-time-to-zero-calculator` 等页面。  
  - 完成 2–3 个国家版本的 BAC Calculator 页面。  
- **Month 2–3**  
  - 持续扩展长尾页面（单位转换、更多国家）。  
  - 开始外链与合作（健康机构、交通安全组织等）。  
- **Month 3+**  
  - 根据数据持续优化文案与 UX。  
  - 评估是否需要多语言版本（例如法语、德语）。  

---

本方案仅为规划与设计层面，下一步即可按照上述阶段，在 `src/messages/en.ts` 和首页代码中逐步落地实现，而无需大改模板整体结构。这样既保持工具站模板的“极简 + 工具优先”哲学，又能系统化地围绕「bac calculator」构建完整的产品与 SEO 体系。

