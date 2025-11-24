# 国际化文本管理规范 (i18n Guidelines)

## 概述

本项目采用统一的国际化文本管理策略,确保所有用户可见文本都通过多语言配置文件进行管理,便于维护和扩展。

## 核心原则

1. **禁止硬编码文本**: 所有用户可见的文本必须抽象为变量
2. **分层管理**: 全局通用文本与页面级文本分离管理
3. **命名规范**: 使用清晰、语义化的键名
4. **类型安全**: 所有文本变量都应有 TypeScript 类型支持

## 文件结构规范

```
src/messages/
├── en.ts                    # 全局通用多语言配置 (英文)
├── zh.ts                    # 全局通用多语言配置 (中文)
├── types.ts                 # TypeScript 类型定义
├── [page-name]/             # 页面级多语言配置文件夹
│   ├── en.ts               # 页面英文配置
│   ├── zh.ts               # 页面中文配置
│   └── index.ts            # 导出聚合
└── ...
```

## 使用规则

### 1. 全局通用文本

**存放位置**: `src/messages/en.ts` (及其他语言文件)

**适用场景**:
- 网站元信息 (metadata)
- 通用组件文本 (header, footer, buttons)
- 通用操作文本 (save, cancel, submit, etc.)
- 错误提示信息
- 表单验证消息

**示例**:
```typescript
// src/messages/en.ts
export default {
  metadata: {
    siteName: "Your Site Name",
    title: "Page Title",
    description: "Page Description"
  },
  common: {
    save: "Save",
    cancel: "Cancel",
    submit: "Submit",
    loading: "Loading...",
    error: "An error occurred",
    backToHome: "Back to Home"
  },
  header: {
    home: "Home",
    about: "About",
    contact: "Contact"
  },
  footer: {
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    allRightsReserved: "All rights reserved."
  }
}
```

### 2. 页面级文本

**存放位置**: `src/messages/[page-name]/en.ts`

**命名规范**: 文件夹名称应与页面路径或组件名称保持一致

**适用场景**:
- 特定页面的标题和描述
- 页面特有的功能文本
- 页面内的表单标签
- 页面特定的提示信息

**目录结构示例**:
```
src/messages/
├── home/
│   ├── en.ts
│   └── zh.ts
├── calculator/
│   ├── en.ts
│   └── zh.ts
├── privacy/
│   ├── en.ts
│   └── zh.ts
└── terms/
    ├── en.ts
    └── zh.ts
```

**示例**:
```typescript
// src/messages/calculator/en.ts
export default {
  title: "MAP Calculator",
  description: "Calculate Mean Arterial Pressure",
  form: {
    systolic: "Systolic Blood Pressure (SBP)",
    diastolic: "Diastolic Blood Pressure (DBP)",
    calculate: "Calculate MAP",
    reset: "Reset"
  },
  result: {
    label: "Your MAP",
    unit: "mmHg",
    interpretation: "Interpretation"
  },
  ranges: {
    low: "Low - Risk of hypoperfusion",
    normal: "Normal - Adequate perfusion",
    high: "High - Monitor closely"
  }
}
```

### 3. 组件中使用多语言文本

#### 客户端组件 (Client Components)

```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function Calculator() {
  const t = useTranslations('calculator');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <button>{t('form.calculate')}</button>
    </div>
  );
}
```

#### 服务端组件 (Server Components)

```tsx
import { getTranslations } from 'next-intl/server';

export default async function CalculatorPage({
  params
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'calculator'
  });

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

## AI 代码生成规范

### ✅ 正确示例

```tsx
// ✅ 使用多语言配置
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('common');
  return <button>{t('submit')}</button>;
}
```

### ❌ 错误示例

```tsx
// ❌ 禁止硬编码文本
export default function Component() {
  return <button>Submit</button>;
}
```

## 添加新页面的步骤

1. **创建页面级多语言文件夹**
   ```bash
   mkdir -p src/messages/[page-name]
   ```

2. **创建语言文件**
   ```bash
   touch src/messages/[page-name]/en.ts
   touch src/messages/[page-name]/zh.ts
   ```

3. **定义文本内容**
   ```typescript
   // src/messages/[page-name]/en.ts
   export default {
     title: "Page Title",
     description: "Page Description",
     // ... 其他文本
   }
   ```

4. **在 next-intl 配置中注册**
   ```typescript
   // src/lib/i18n.ts 或 middleware.ts
   // 确保新的 namespace 被正确加载
   ```

5. **在页面中使用**
   ```tsx
   const t = useTranslations('[page-name]');
   ```

## 命名约定

### 键名规范

- 使用小驼峰命名法 (camelCase)
- 语义清晰,见名知意
- 避免使用缩写 (除非是通用缩写如 id, url)
- 嵌套结构不超过 3 层

**示例**:
```typescript
{
  // ✅ 好的命名
  submitButton: "Submit",
  errorMessage: "Error occurred",
  userProfile: {
    firstName: "First Name",
    lastName: "Last Name"
  },

  // ❌ 避免的命名
  btn: "Submit",              // 过于简短
  msg: "Error",               // 缩写不清晰
  text1: "Some text"          // 无语义
}
```

## 类型安全

### 定义消息类型

```typescript
// src/messages/types.ts
export interface Messages {
  metadata: {
    siteName: string;
    title: string;
    description: string;
  };
  common: {
    save: string;
    cancel: string;
    submit: string;
  };
  calculator: {
    title: string;
    form: {
      systolic: string;
      diastolic: string;
    };
  };
}
```

### 使用类型

```typescript
// src/messages/en.ts
import type { Messages } from './types';

const en: Messages = {
  metadata: {
    siteName: "Site Name",
    title: "Title",
    description: "Description"
  },
  // ... 其他配置
};

export default en;
```

## 检查清单

在提交代码前,请确认:

- [ ] 所有用户可见文本都已抽象为变量
- [ ] 全局文本已添加到 `src/messages/en.ts`
- [ ] 页面级文本已添加到对应的页面文件夹
- [ ] 所有语言文件都已同步更新 (en, zh, etc.)
- [ ] 组件中正确使用 `useTranslations` 或 `getTranslations`
- [ ] 没有硬编码的文本字符串
- [ ] 键名符合命名规范
- [ ] 类型定义已更新 (如适用)

## 常见问题

### Q: 什么文本需要国际化?

**A**: 所有用户可见的文本,包括但不限于:
- 页面标题和描述
- 按钮和链接文本
- 表单标签和占位符
- 错误和成功消息
- 导航菜单
- 页脚信息

### Q: 开发环境下的调试文本需要国际化吗?

**A**: 不需要。`console.log` 等调试信息可以使用英文硬编码。

### Q: 如何处理动态文本?

**A**: 使用 next-intl 的插值功能:

```typescript
// 配置文件
{
  welcomeMessage: "Welcome, {name}!"
}

// 使用
t('welcomeMessage', { name: userName })
```

### Q: 如何处理复数和性别?

**A**: 使用 next-intl 的 rich text 和 ICU message format:

```typescript
{
  itemCount: "{count, plural, =0 {No items} =1 {1 item} other {# items}}"
}
```

## 迁移现有代码

如果需要将现有硬编码文本迁移到国际化配置:

1. 搜索所有 JSX 中的文本字符串
2. 识别文本类型 (全局 vs 页面级)
3. 添加到对应的多语言配置文件
4. 替换为 `t()` 函数调用
5. 测试所有语言版本

## 参考资源

- [next-intl 官方文档](https://next-intl-docs.vercel.app/)
- [ICU Message Format](https://formatjs.io/docs/core-concepts/icu-syntax/)
- 项目 `USAGE.md` - 国际化章节

---

**最后更新**: 2025-11-07
**维护者**: Development Team

## AI 助手注意事项

🤖 **给 AI 代码生成工具的特别提醒**:

在生成任何包含用户可见文本的代码时,必须:

1. **首先检查** 是否已存在相关的多语言配置
2. **如果不存在**,在生成代码的同时:
   - 判断文本是全局通用还是页面特定
   - 在对应的多语言配置文件中添加文本定义
   - 使用 `useTranslations()` 或 `getTranslations()` 引用文本
3. **绝对禁止** 在组件中直接硬编码任何用户可见的文本字符串
4. **文档注释** 可以使用英文,不需要国际化

**执行顺序**:
1. 分析需求,确定需要哪些文本
2. 更新/创建对应的多语言配置文件
3. 生成使用这些配置的组件代码
4. 提示用户同步更新其他语言版本 (如 zh.ts)
