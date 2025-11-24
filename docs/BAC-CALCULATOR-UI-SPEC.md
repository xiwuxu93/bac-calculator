# BAC Calculator 组件 UI 与交互规格（设计文档）

> 目的：在编码前明确 `BacCalculator` 组件的输入字段、输出结果、布局与交互，确保实现阶段可以直接对照本规格开发。

---

## 1. 组件定位与文件位置

- 组件名称：`BacCalculator`
- 预期文件：`src/components/BacCalculator.tsx`
- 类型：Client Component（需要表单交互与即时计算）
- 职责：
  - 接收用户输入（性别、体重、地区、饮酒信息、时间）；
  - 调用内部计算逻辑（后续放在独立 util 文件内）；
  - 将结果以清晰、可视化的方式呈现，并给出安全导向的文案。

> 计算公式与常量（饮品选项、法定上限等）不直接写在组件中，而是放在 `lib/bac` 目录下的工具函数与配置中。

---

## 2. Props 设计（初版）

```ts
type BacCalculatorProps = {
  /** 默认国家/地区代码，例如 'US'、'UK'、'AU' 等 */
  defaultCountryCode?: string;
  /** 默认性别，例如 'male' | 'female' */
  defaultSex?: 'male' | 'female';
  /** 默认体重（数值 + 单位） */
  defaultWeight?: {
    value: number;
    unit: 'kg' | 'lb';
  };
  /** 是否允许在本地存储最近一次输入，用于回访用户 */
  enableLocalStorage?: boolean;
};
```

> 如无特别需要，首页使用时可以只传 `defaultCountryCode`（根据用户主市场，例如 'US'）。

---

## 3. 布局规划

### 3.1 桌面端布局

- **上方 / 左侧**：输入区域（Form）  
- **下方 / 右侧**：结果区域（Result）

建议结构：

- `div` 外层：卡片样式、浅边框或阴影，背景白色  
- 内部分为两列（`md:grid md:grid-cols-2`），移动端则单列堆叠

### 3.2 移动端布局

- 采用单列布局：  
  - 顶部为输入表单  
  - 其下为结果区域  
- 保证在常见手机高度下，“Calculate” 按钮与部分结果可以在首屏附近看到。

---

## 4. 输入字段规格

### 4.1 基本信息

1. **Sex / Gender（性别）**  
   - 控件：Radio group（Male / Female）  
   - 用途：选择分布容积系数 `r`

2. **Body Weight（体重）**  
   - 控件：数字输入框 + 单位切换（kg / lb）  
   - 校验：> 0 且在合理范围（例如 30–250 kg 或等值）  
   - 单位切换时应自动转换当前值（避免用户困惑）

3. **Country / Region（国家/地区）**  
   - 控件：下拉列表  
   - 至少包括：US, UK, AU, CA, NZ, MA (Morocco), DZ (Algeria)，后续可扩展  
   - 用途：匹配法律上限与对应说明文案

### 4.2 时间信息

4. **Time Since First Drink（从第一杯酒开始经过的时间）**  
   - 控件：两个数字输入框（hours, minutes）  
   - 校验：不可为负；总时间不应过大（例如>24 h 时可给出提示）  
   - 内部统一转换为小时小数

> 未来版本可以考虑改为“开始时间 + 当前时间”的时间选择组件，但初版以简单小时/分钟为主。

### 4.3 饮酒信息（Drink List）

结构：多行可编辑列表，每行代表一种饮品组合。

每一行包含：

1. **Drink Type（类型）**  
   - 控件：下拉或 Segmented control  
   - 选项：Beer / Wine / Spirits / Other

2. **Number of Drinks（数量）**  
   - 控件：数字输入框（整数，>= 0）  
   - 默认值可为 1

3. **Serving Size（容量）**  
   - 控件：下拉列表 + 可选自定义  
   - 选项由 `docs/bac-data-notes.md` 中的容量规划提供（例如 330 mL、150 mL、44 mL 等）

4. **ABV（酒精度）**  
   - 控件：下拉 + 自定义数值输入  
   - 默认值根据类型填充（Beer 5%、Wine 12%、Spirits 40% 等）

> 同时提供“Add drink” 按钮以添加新行，“Remove” 图标按钮删除行。  
> 至少保留一行，防止完全空列表导致用户困惑。

### 4.4 控制按钮

- **Estimate BAC**（主按钮）  
  - 点击后触发校验与计算。  
  - 禁用条件：关键字段为空或明显非法。

- **Reset / Clear**（次按钮）  
  - 清空饮品列表并恢复默认值。  
  - 在启用 localStorage 的情况下，可以另外提供“Clear saved defaults” 链接。

---

## 5. 输出结果规格

> 结果区域应在视觉层面清晰区分“当前估算值”“法律风险”“安全建议”与“时间到清零”几部分。

### 5.1 核心数值

1. **Estimated BAC（估算 BAC）**  
   - 显示形式：例如 `0.072 %`  
   - 同时提供单位切换：  
     - `%`（g/dL）  
     - `‰`（promille）  
     - `mg/dL`（如有必要）  
   - 显示单位切换为 UI 控件（tabs 或 small select），仅改变显示，不改变内部计算。

2. **Risk Level（风险等级）**  
   - 基于 `docs/bac-data-notes.md` 中的风险区间：Low / Medium / High  
   - 使用颜色与标签，例如：  
     - 绿色 / Amber / 红色  
   - 附带一段简短解释文本。

### 5.2 法律风险与地区信息

- 使用选定国家/地区的法定上限常量：  
  - 示例文案：  
    - “In your selected region, the general legal limit for drivers is 0.05% BAC.”  
    - “Your estimated BAC is 0.072%, which is above this limit.”
- 对于存在不同司机类别（新手/职业司机）的地区：  
  - 在说明中简要指出：  
    - “Some drivers (novice or professional) may be subject to even lower limits.”

### 5.3 安全建议（Safety Recommendation）

- 输出一条清晰的结论性文本，例如：  
  - “Do NOT drive. Your estimated BAC is likely high enough to impair driving and may be above the legal limit.”  
  - “Even if you might be under the legal limit, your driving can still be impaired. The safest choice is not to drive.”
- 始终包含一行固定 disclaimer：  
  - “This is only an estimate. Never use any BAC calculator to decide whether you can drive.”

### 5.4 Time‑to‑zero 估算

- 使用代谢速率 `β` 估算：  
  - 到 0.00% 的预计时间范围  
  - 到法定上限以下的预计时间范围（如当前已超过）  
- 文案形式示例：  
  - “Based on typical elimination rates, it may take approximately 6–8 hours for your BAC to return to 0.00%.”  
  - “These times are only rough estimates. Your actual BAC could be higher or lower.”

> 可以使用简洁时间线或仅文字列表，初版以文字为主。

---

## 6. 交互与状态管理

### 6.1 校验与错误反馈

- 所有数值输入在失焦时进行基本校验：  
  - 非数字或负数 → 显示错误信息并高亮输入框  
  - 不合理的极端值（如体重 < 25 kg 或 > 300 kg）→ 显示警告但允许继续
- 点击 “Estimate BAC” 时进行一次整体校验：  
  - 若关键字段缺失（例如没有任何饮品），在顶部显示一条摘要错误提示，并将视图滚动到第一个错误字段。

### 6.2 计算触发策略

- 初版采用“点击按钮计算”的方式：  
  - 输入变更不会立即重新计算，避免频繁触发。  
  - 用户修改值后再次点击按钮更新结果。
- 后续可考虑提供可选“自动更新”模式。

### 6.3 本地存储（可选）

- 当 `enableLocalStorage = true` 时：  
  - 保存用户最近一次的基础信息（性别、体重、地区）  
  - 加载页面时尝试读取并填充  
  - 提供 “Clear saved defaults” 小链接以清除数据

---

## 7. 无障碍与可用性要求

- 所有表单控件必须配有 `<label>` 或 `aria-label`。  
- Radio/Select 组件需可用键盘操作。  
- 错误消息通过文本展示，并通过适当的 ARIA 属性关联到字段。  
- 颜色用于辅助区分风险等级，但不能作为唯一信息来源（需要文本说明）。  
- 按钮点击区域在移动端不少于 44×44 像素。

---

## 8. 未来扩展（非当前版本必须）

- 支持“保存并分享结果”功能（仅保存匿名概要，例如估算 BAC 与时间）  
- 支持“示例场景”按钮，一键填充典型场景（例如 3 bottles of beer in 2 hours）  
- 支持将当前估算结果传递给单独的 Time‑to‑zero 页面作为初始状态

---

本规格文档完成后，开发时可按以下顺序落地：

1. 根据本文件实现 `BacCalculator` UI（静态表单与结果区域）。  
2. 将计算逻辑封装在 `lib/bac` 中（使用 `docs/bac-data-notes.md` 的常量规划）。  
3. 在首页替换 `ContentPlaceholder`，嵌入 `BacCalculator`。  
4. 在实现过程中，如有与本规格不一致的 UX 调整，应回写本文档保持同步。 

