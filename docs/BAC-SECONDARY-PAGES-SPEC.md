# BAC 次级工具与专题页面规格（规划文档）

> 目的：为 time‑to‑zero、how‑to、accuracy、国家版本以及单位转换等页面提供统一的结构与内容规划，后续实现时可直接参照。

---

## 1. `/bac-time-to-zero-calculator`

### 1.1 页面目标与关键词

- 目标关键词：  
  - `bac time to zero calculator`  
  - `time to zero bac calculator`  
  - `when will i be sober bac calculator`  
- 目标：帮助用户估算从当前 BAC 降到 0.00% 或法律上限所需时间，并强化“估算仅供参考，不能用来决定是否驾驶”的信息。

### 1.2 信息结构

1. Hero 区
   - H1：`BAC Time to Zero Calculator`  
   - 副标题：简要解释“估算多久可能清醒”，强调不用于驾驶决策。
2. 工具区（Time‑to‑zero mini calculator）
   - 输入模式：
     - 模式 A：直接输入当前估算 BAC（%）  
     - 模式 B：使用与主工具类似的饮酒信息（可选，将来可与主工具共享）
   - 输出：
     - 估算到 0.00% 的时间区间（例如 6–8 小时）  
     - 若当前 > 法定上限，估算回落到法律上限以下的时间区间  
     - 文字说明与安全建议
3. 文档区（MarkdownContent）
   - 解释代谢速率与影响因素  
   - 强调“每个人差异极大”的事实  
   - 用几个示例说明“看似时间很久，但仍可能不适合驾驶”
4. FAQ
   - Why is there a range instead of a single time?  
   - Can I speed up alcohol elimination?  
   - Does sleep or coffee make me sober faster?  

### 1.3 特别提示

- 每个结果块下方都要有明确 disclaimer：  
  - “This is a rough estimate only. Your actual BAC may still be above zero even after this time.”

---

## 2. `/how-to-calculate-bac`

### 2.1 页面目标与关键词

- 目标关键词：  
  - `how to calculate bac`  
  - `how to calculate your bac`  
  - `how do you calculate bac levels`  
  - `how is bac calculated`
- 目标：解释 BAC 计算背后的公式与步骤，为学生、驾校学员、内容创作者提供清晰的参考。

### 2.2 结构规划

1. Hero 区
   - H1：`How to Calculate Blood Alcohol Concentration (BAC)`  
   - 概述：指出本文解释的是估算方法，不是法医或执法精确测量。
2. 正文（MarkdownContent）
   - What is BAC?（简短定义）  
   - Widmark 公式介绍（引用 `docs/bac-data-notes.md`）  
   - 逐步说明如何从“喝了几杯酒”推导到 BAC：  
     - 计算纯酒精量  
     - 应用分布容积系数  
     - 考虑饮酒时间与代谢  
   - 示例计算（使用简单数字展示步骤）  
   - 精确测量 vs 在线估算（呼气测试、血检等）  
   - 限制与误差来源（新陈代谢差异、食物、药物、健康状况等）
3. 内嵌简化版计算器模块
   - 输入项只保留最基本的：  
     - 性别、体重  
     - 总“标准杯数”（根据预设）  
     - 饮酒持续时间  
   - 仅用于教学示例（可在后续实现时重用主工具逻辑）
4. FAQ / 小提示
   - Why do different calculators give different results?  
   - Why is law enforcement BAC different from online estimates?  

---

## 3. `/most-accurate-bac-calculator`

### 3.1 页面目标与关键词

- 目标关键词：  
  - `most accurate bac calculator`  
  - `are bac calculators accurate`  
  - `how accurate are bac calculators`
- 目标：针对“准确性焦虑”做科普，解释什么意义上的“准确”，以及为什么任何在线工具都不可能完全准确。

### 3.2 内容结构

1. Hero 区  
   - H1：`How Accurate Are BAC Calculators?` 或 `The Most Accurate BAC Calculator?`  
   - 副标题：说明本文/本工具追求的是“尽可能安全的估算”，而非法医级精度。

2. 对比分析段落
   - 在线 BAC 工具的共同点：都依赖 Widmark 或类似公式  
   - 精度受哪些因素影响：  
     - 输入信息的粗糙程度（只知道“几杯酒” vs 具体 ABV 和容量）  
     - 个体生理差异  
     - 同时饮食、药物等

3. 我们的做法
   - 使用细化的输入项（酒种、容量、ABV、时间）  
   - 清楚展示假设与限制  
   - 总是偏向安全的解释（不鼓励开车）

4. 结论区
   - 直接回答：“不存在真正‘最准确’的在线 BAC 计算器。”  
   - 强调：最佳做法是“如果喝酒就不要开车”。

5. FAQ
   - Are breathalyzers more accurate than online BAC calculators?  
   - Why does my wearable/health app show different numbers?  

---

## 4. 国家版本页面 `/bac-calculator-[country]`

### 4.1 模板思路

> 示例：`/bac-calculator-uk`, `/bac-calculator-australia`, `/bac-calculator-nz`, `/bac-calculator-maroc`, `/bac-calculator-dz` 等。

统一结构：

1. Hero 区
   - H1：`BAC Calculator – [Country Name]`  
   - 副标题：强调本页简介该国法律与文化背景。
2. 工具区
   - 内嵌与首页相同的 `BacCalculator`，但：  
     - `defaultCountryCode` 设置为对应国家  
     - 结果文案中优先展示该地区的法定上限与说明。
3. “Legal limits in [Country]” 段落
   - 简短表格：  
     - 一般驾驶员上限  
     - 新手/职业驾驶员特殊限制（如有）  
   - 承上启下链接到官方来源（gov 网站）
4. 特殊说明
   - 若该国有零容忍或极低上限政策（如某些国家对特定司机）：  
     - 特别强调“即使非常少量饮酒也可能违法”。
5. FAQ（本地化）
   - What is the drink-driving limit in [Country]?  
   - Are there stricter limits for learner or professional drivers?  
   - What are the penalties for drink driving in [Country]?（仅做简要概述，避免提供法律建议）

> 所有法律相关内容需配以“不是法律建议”的免责声明。

---

## 5. 单位转换工具页面

> 覆盖 `promille to bac`, `mg dl to bac`, `bac conversion calculator` 等关键词。

### 5.1 `/promille-to-bac`

- H1：`Promille to BAC Converter`  
- 说明：解释 promille（‰）与 %BAC 的关系。  
- 工具：  
  - 输入：promille 数值  
  - 输出：对应的 %BAC 与 mg/dL（可选）  
- 文档：简要说明单位概念及使用场景。

### 5.2 `/mgdl-to-bac`

- H1：`mg/dL to BAC Converter`  
- 工具：  
  - 输入：mg/dL  
  - 输出：%BAC / ‰  
- 文档：解释实验室报告中的 mg/dL 单位与驾驶法规中常用单位的对应关系。

### 5.3 `/bac-conversion-calculator`

- H1：`BAC Unit Conversion Calculator`  
- 工具：  
  - 输入：任意一种单位（下拉选择：%、‰、mg/dL）  
  - 输出：其余单位的数值  
- 文档：将前面两个页面的内容整合，适合作为“单位总览”。

> 实现上可以复用同一个转换组件，仅通过 props 决定默认单位与标题。

---

本文件完成后，后续编码阶段可以按此为每个 URL 创建对应的 Next.js 页面：  
- 统一使用 Header + Footer 布局；  
- 使用 `MarkdownContent` 渲染正文；  
- 在合适位置嵌入主计算器或简化版/转换工具组件。 

