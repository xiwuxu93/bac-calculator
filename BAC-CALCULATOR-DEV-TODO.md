# BAC Calculator 开发 Todo（代码实现版）

> 说明：这一份是“写代码落地”的开发任务清单，假定 `BAC-CALCULATOR-PLAN.md`、`BAC-CALCULATOR-TODO.md` 中的规划 & 文案已经完成。  
> 开发时按阶段依次完成，每个小项对应具体文件/实现动作。

---

## 阶段 A：基础与环境

- [ ] 在本地/CI 环境执行依赖安装与开发服务器启动  
  - [ ] `npm install`  
  - [ ] `npm run dev`  
  - [ ] 确认首页 `/` 可以正常打开，文案显示为 BAC 相关内容  
  - （说明：当前云端环境缺少 `npm`，需在本地或 CI 中执行）
- [x] 检查 TypeScript 与 ESLint（如配置）：确保当前代码无报错/严重警告  
  - [x] 使用 `npx tsc -p tsconfig.json --noEmit` 通过类型检查

---

## 阶段 B：BAC 计算核心逻辑（lib 层）

> 目标：在 UI 之前先把纯函数和常量准备好，方便测试和复用。

- [x] 创建 `src/lib/bac/` 目录（如不存在）  
- [x] 在 `src/lib/bac/constants.ts` 中实现基础常量：  
  - [x] 酒精密度常量（乙醇密度）  
  - [x] 分布容积系数 `r`（male/female）  
  - [x] 代谢速率 `beta`（单值或范围）  
  - [x] 各饮品类型的默认 ABV & 容量选项（根据 `docs/bac-data-notes.md`）  
  - [x] 各国家/地区的法定 BAC 上限结构（`LegalLimit` 类型等）
- [x] 在 `src/lib/bac/types.ts` 中定义类型：  
  - [x] `Sex`, `WeightUnit`, `CountryCode` 等基础类型  
  - [x] `DrinkType`, `DrinkInput`, `BacResult`, `TimeToZeroResult` 等结构  
- [x] 在 `src/lib/bac/units.ts` 中实现单位转换函数：  
  - [x] % ↔ ‰ ↔ mg/dL 转换  
  - [x] 体重单位 kg ↔ lb 转换  
- [x] 在 `src/lib/bac/calculation.ts` 中实现核心计算函数：  
  - [x] `calculateAlcoholMass(drinks: DrinkInput[]): number`（总酒精质量 g）  
  - [x] `estimateBac(params): BacResult`（Widmark 公式 + 时间 + 性别/体重）  
  - [x] `classifyRiskLevel(bac: number): { level: 'low' | 'medium' | 'high'; messageKey: string }`  
  - [x] `estimateTimeToZero(params): TimeToZeroResult`（基于当前 BAC 与 beta）  
- [ ] 为上述函数添加基础单元测试（如项目已有测试框架）：  
  - （说明：当前项目未配置测试框架和 `npm test` 脚本，建议后续在本地选用 Jest 或 Vitest 配置后再补充此项）

---

## 阶段 C：BacCalculator 组件实现

> 对照 `docs/BAC-CALCULATOR-UI-SPEC.md` 落地 UI 与交互。

- [x] 在 `src/components/BacCalculator.tsx` 中创建客户端组件  
  - [ ] 使用 `use client` + React hooks 管理表单状态和结果  
  - [ ] 按规范实现布局（桌面两列、移动单列）
- [x] 实现基础信息输入区域：  
  - [x] 性别 Radio 组（使用 i18n 文案）  
  - [x] 体重输入 + kg/lb 切换（切换时做数值转换）  
  - [x] 国家/地区下拉（选项从 `LEGAL_LIMITS` 常量生成）
- [x] 实现时间输入：  
  - [x] “Time since first drink”：hours + minutes 字段  
  - [x] 合理校验（>= 0，过大值提示）
- [x] 实现饮酒信息列表 UI：  
  - [x] 一行包含：Drink Type、Number、Serving Size、ABV  
  - [x] 支持添加/删除行（至少保留一行）  
  - [x] Serving/ABV 下拉默认值来自 constants，可自定义输入  
  - [x] 所有 label 与选项文本使用 i18n（新增 namespace，例如 `calculator`）
- [x] 实现操作按钮：  
  - [x] `Estimate BAC` 主按钮（触发计算）  
  - [x] `Reset` / `Clear` 次按钮（恢复默认状态）  
  - [x] 根据表单是否有效控制 `Estimate` 的 disabled 状态
- [x] 集成计算逻辑：  
  - [x] 在点击 Estimate 时调用 `estimateBac` / `classifyRiskLevel` / `estimateTimeToZero`  
  - [x] 捕获异常或无效输入，给出 user-friendly 错误提示（i18n）
- [x] 结果展示区域：  
  - [x] 显示 Estimated BAC 值 + 单位切换 tabs（% / ‰ / mg/dL）  
  - [x] 显示 Risk level（颜色 + 文案，颜色通过 Tailwind class 控制）  
  - [x] 显示与当地 legal limit 对比的说明文本（使用 constants + i18n 模板字符串）  
  - [x] 显示 Safety recommendation 文案（强烈强调“不建议驾驶”）  
  - [x] 显示 Time‑to‑zero 估算（到 0.00% 与到 legal limit 的时间范围）
- [x] 实现 localStorage 逻辑（如 `enableLocalStorage` 为 true）：  
  - [x] 使用 `useEffect` 在客户端读取/写入  
  - [x] 保存基础信息（性别、体重、国家）与常用饮品行  
  - [x] 提供“Clear saved defaults” 小链接（i18n 文案）
- [x] 无障碍支持：  
  - [x] 所有输入均有 `<label>` 并关联 `id`  
  - [x] 错误信息通过 aria 属性与字段关联  
  - [x] Risk level 既用颜色又用文字说明

---

## 阶段 D：将 Calculator 嵌入首页

- [x] 在 `src/components` 中导出 `BacCalculator`（默认 export）  
- [x] 在 `src/app/[locale]/page.tsx` 中：  
  - [x] 替换 `<ContentPlaceholder />` 为 `<BacCalculator defaultCountryCode="US" enableLocalStorage />`  
  - [x] 保持文档区与 FAQ 区结构不变  
  - [x] 确保 TypeScript 类型与 `Locale` 处理无冲突
- [ ] 手动在浏览器中测试首页：  
  - [ ] 表单交互正常、结果区域正确更新  
  - [ ] 移动端样式与响应式布局符合预期  
  - （说明：需在本地 `npm run dev` 环境中人工验证）

---

## 阶段 E：次级工具组件与页面实现

> 按 `docs/BAC-SECONDARY-PAGES-SPEC.md` 实现路由与内容。

### E1. Time‑to‑Zero 计算器

- [x] 在 `src/components/BacTimeToZeroCalculator.tsx` 中实现简化组件：  
  - [x] 输入当前估算 BAC 值（或简单饮酒信息）  
  - [x] 输出 time‑to‑zero 与 time‑to‑legal-limit 估算  
  - [x] 使用 `estimateTimeToZero` 复用逻辑
- [x] 新建页面：`src/app/[locale]/bac-time-to-zero-calculator/page.tsx`  
  - [x] 实现 `generateMetadata`（使用 `BAC-SEO-SPEC` 中的 title/description）  
  - [x] 布局：Hero + 工具 + MarkdownContent + FAQ（如需要）  
  - [x] 文案从 `src/messages` 新增 namespace（如 `timeToZero`）读取

### E2. How‑to 页面

- [x] 新建 `src/app/[locale]/how-to-calculate-bac/page.tsx`  
  - [x] 使用 `MarkdownContent` 渲染步骤式教程（内容按规划书写到 i18n 或 markdown 文件）  
  - [x] 内嵌一个精简版 calculator 组件（可重用 `BacCalculator` 的子集或另写 `MiniBacCalculator`）  
  - [x] 使用 `HowTo` + `Article` schema（通过 `<script type="application/ld+json">`）

### E3. Accuracy 页面

- [x] 新建 `src/app/[locale]/most-accurate-bac-calculator/page.tsx`  
  - [x] 使用 Hero + MarkdownContent 布局  
  - [x] 解释准确性限制，并在文中链接首页主工具  
  - [x] 添加 `Article` 类型 JSON‑LD

### E4. 国家版本页面

- [x] 按优先顺序创建页面，例如：  
  - [x] `src/app/[locale]/bac-calculator-uk/page.tsx`  
  - [x] `src/app/[locale]/bac-calculator-australia/page.tsx`  
  - [x] `src/app/[locale]/bac-calculator-nz/page.tsx`  
  - [x] `src/app/[locale]/bac-calculator-maroc/page.tsx`  
  - [x] `src/app/[locale]/bac-calculator-dz/page.tsx`
- [x] 每个页面：  
  - [x] 使用 `BacCalculator`，传入对应 `defaultCountryCode`  
  - [x] 文本段落介绍当地 legal limit（从 constants 读取 + 文案补充）  
  - [x] 包含简单 FAQ 与官方链接  
  - [x] 在 `generateMetadata` 中设置对应标题和描述

### E5. 单位转换工具

- [x] 实现共用转换组件 `src/components/BacUnitConverter.tsx`：  
  - [x] 支持选择输入单位（%、‰、mg/dL）  
  - [x] 自动计算并显示所有其他单位  
  - [x] 使用 `units.ts` 中的转换函数
- [x] 页面实现：  
  - [x] `/promille-to-bac`  
  - [x] `/mgdl-to-bac`  
  - [x] `/bac-conversion-calculator`  
  - [x] 每页布局：Hero + Converter + 简短说明（MarkdownContent）

---

## 阶段 F：导航、内链与 Schema 收尾

- [x] 更新 `Header` 导航：  
  - [x] 添加链接：Home / Time to Zero / How It Works / Accuracy  
  - [x] 确保使用 i18n 文案（新增 `header` 字段）
- [x] 在各页面中按 `BAC-SEO-SPEC` 添加内部链接：  
  - [x] 首页 Docs 区链接到 time‑to‑zero / how‑to / accuracy 页  
  - [x] how‑to 页链接回首页主工具  
  - [x] accuracy 页链接到首页与 time‑to‑zero 页  
  - [x] 国家页之间增加“Switch country” 区域
- [x] 为新页面添加 JSON‑LD：  
  - [x] 在对应 page 组件中注入 `<script type="application/ld+json">`  
  - [x] 内容使用 TypeScript 构建对象再 `JSON.stringify`

---

## 阶段 G：测试、性能与上线前检查

- [ ] 运行本地测试（若有）：`npm test` 或 `npm run test`  
- [ ] 使用浏览器逐一验证：  
  - [ ] 各页面表单交互与结果正确  
  - [ ] 错误提示与边界情况（极端体重、饮酒量等）  
  - [ ] 响应式布局正常
- [ ] 使用 Lighthouse / PageSpeed Insights 检查首页与主要页面：  
  - [ ] 性能、可访问性、最佳实践、SEO 分数达预期  
- [ ] 部署到预生产或生产环境后：  
  - [ ] 在真实 URL 下验证结构化数据（Rich Results Test）  
  - [ ] 在 Google Search Console 提交 sitemap 并检查抓取/索引状态  
- [ ] 如启用 Google Analytics：  
  - [ ] 设置事件（例如 Estimate 按钮点击）并验证数据上报  
  - [ ] 确认不会明显拖慢首屏加载  
  - （说明：以上测试与性能检查需在真实部署或本地运行的浏览器环境中执行）

---

完成以上开发 Todo 后，再回到 `BAC-CALCULATOR-TODO.md` 的阶段 9 清单做最终逐项核对，即可正式上线。 
