# 法律与 E‑E‑A‑T 内容规划（BAC Calculator）

> 目的：为后续隐私、条款、免责声明、关于我们等页面提供统一的 BAC 相关表述方向，并增强 E‑E‑A‑T 信号。

---

## 1. 隐私政策（Privacy Policy）要点

当前模板隐私政策已强调：

- 计算在浏览器本地完成；  
- 不收集或存储用户输入的数据；  
- 仅可能使用聚合分析数据。

针对 BAC 工具，需要补充/强调：

- 我们不会记录用户输入的饮酒信息、体重、时间等敏感数据。  
- 如未来接入错误监控或日志记录系统，应确保不会意外存储个人数据；若有必要记录，应在隐私政策中明确说明。  
- 若使用第三方广告或分析工具（如 Google Analytics、AdSense）：  
  - 列明这些服务可能设置 cookie；  
  - 为欧盟等地区准备 cookie 通知与选择机制。

实现建议：

- 在 `src/messages/en.ts` 的 `privacy` 段落中追加一句专门针对 BAC 计算器的说明，例如：  
  - “Because this is a BAC calculator, the information you enter about drinks and body weight may be sensitive. We design the tool so that these details stay in your browser and are not stored on our servers.”

---

## 2. 使用条款（Terms of Service）要点

在现有模板基础上，需明确：

- 本工具仅用于信息和教育目的；  
- 不构成医疗、法律或驾驶决策建议；  
- 使用者对其行为与任何后果负全部责任；  
- 网站拥有者不承担因使用 BAC 计算器而产生的任何直接/间接损失责任。

建议增加的具体条款方向：

- 明确提及“driving, operating machinery, or performing safety-sensitive tasks”时，用户不能依赖本工具做决策。  
- 指出“applicable drink‑driving laws vary by jurisdiction and change over time”，用户需自行确认当前法律规定。

---

## 3. 免责声明（Disclaimer）要点

免责声明需要比一般工具更强烈，涵盖以下内容：

1. **仅为估算**：  
   - BAC 计算器输出的所有数值是基于通用公式和假设的估算值。  
   - 实际 BAC 可能显著高于或低于工具显示结果。

2. **不能用于驾驶决策**：  
   - 必须在多处重复：  
     - 页面顶部说明  
     - 结果区域附近  
     - 免责声明页面  
   - 示例表述：  
     - “You must never use BAC calculator results to decide whether it is safe or legal to drive.”

3. **法律与医疗责任**：  
   - 本站不为任何与酒精相关的违法行为或健康后果承担责任；  
   - 鼓励用户在有疑虑时咨询医生、成瘾专科或法律专业人士。

实现建议：

- 在 `disclaimer` 文案中增加与 BAC 和驾驶直接相关的句子；  
- 在首页结果区域和相关页面中引用短版提示（如 `common.professionalUseOnly` 可更新为更适合 BAC 的文本）。

---

## 4. 关于我们 / 审核流程文案规划

> 用于未来新增的 `About` 或 `Methodology` 页面。

建议包含内容：

1. **站点使命**  
   - 例如：“帮助人们更直观地理解饮酒对安全与法律风险的影响，以鼓励更安全的选择。”

2. **作者与经验（Experience）**  
   - 简要介绍站点建立者的背景：数据/产品、健康科普兴趣等。  
   - 强调与公共卫生、道路安全的关注点。

3. **专业审核（Expertise & Authoritativeness）**  
   - 若后续有医疗或法律专业人士参与审阅：  
     - 提供姓名、资格（例如 MD、RN、交通律师等）和专业领域。  
     - 说明其在内容审核中的角色（“Reviewed for medical accuracy as of YYYY‑MM‑DD”）。

4. **数据与来源**  
   - 列出主要参考来源类型：  
     - 公共卫生机构（NIH, CDC, WHO 等）  
     - 各国交通管理部门  
     - 相关同行评审文献或权威教材  
   - 说明定期更新计划，例如“我们每年至少审查一次法律限值和主要文献”。

5. **更新与反馈机制**  
   - 提供联系方式或表单，让专业人士或用户可以反馈错误。  
   - 简述处理流程：“收到反馈后，我们会尽快核实并在必要时更新内容。”

---

## 5. 权威来源清单（与数据文档呼应）

搭配 `docs/bac-data-notes.md` 使用，可在此列出更偏“内容层面”的权威资源，例如：

- NIAAA “Rethinking Drinking” 相关材料  
- 各国政府关于 drink‑driving 的官方页面  
- 介绍 Widmark 公式与酒精代谢的基础教材或综述文章

实现时：

- 在相关内容页面底部添加“References” 区域，列出若干核心链接；  
- 避免在页面中大量堆砌链接，保持简洁。

---

本文件为规划用，不直接渲染到页面。  
在后续修改 `src/messages/en.ts` 的 `privacy`、`terms`、`disclaimer` 文案以及新建 About/Methodology 页面时，应以本文件为蓝本进行补充和细化。 

