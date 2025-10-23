# 国际化 (i18n) 使用指南

本项目已集成国际化支持，支持中文和英文两种语言。

## 文件结构

```
src/i18n/
├── index.ts              # 国际化主文件
├── locales/
│   ├── zh.ts            # 中文翻译
│   └── en.ts            # 英文翻译
└── hooks/
    └── useLanguage.ts   # 语言切换Hook
```

## 使用方法

### 1. 基本翻译

在任何组件中使用 `t` 函数进行翻译：

```typescript
import { t } from '@/i18n';

// 使用翻译
<Text>{t('account.loginButton')}</Text>
<Text>{t('common.loading')}</Text>
```

### 2. 语言切换

使用 `useLanguage` Hook 进行语言切换：

```typescript
import { useLanguage } from '@/hooks/useLanguage';

const MyComponent = () => {
  const { currentLocale, changeLanguage, t } = useLanguage();
  
  const handleLanguageChange = () => {
    const nextLocale = currentLocale === 'zh' ? 'en' : 'zh';
    changeLanguage(nextLocale);
  };
  
  return (
    <TouchableOpacity onPress={handleLanguageChange}>
      <Text>{t('common.switchLanguage')}</Text>
    </TouchableOpacity>
  );
};
```

### 3. 添加新的翻译

在 `src/i18n/locales/zh.ts` 和 `src/i18n/locales/en.ts` 中添加新的翻译键值对：

```typescript
// zh.ts
export const zh = {
  myPage: {
    title: '我的页面',
    description: '这是一个描述',
  },
};

// en.ts
export const en = {
  myPage: {
    title: 'My Page',
    description: 'This is a description',
  },
};
```

然后在组件中使用：

```typescript
<Text>{t('myPage.title')}</Text>
<Text>{t('myPage.description')}</Text>
```

## 已国际化的页面

- ✅ Account页面 - 用户账户页面
- ✅ Login页面 - 登录页面
- ✅ SearchBar组件 - 搜索栏组件
- ✅ BottomsTab导航 - 底部导航栏

## 语言存储

用户选择的语言会自动保存到 AsyncStorage 中，下次启动应用时会自动恢复。

## 注意事项

1. 翻译键使用点号分隔的嵌套结构，如 `account.loginButton`
2. 如果翻译键不存在，会返回键名本身作为fallback
3. 语言切换会立即生效，无需重启应用
4. 所有硬编码的文案都应该使用国际化

## 扩展支持

要添加更多语言支持：

1. 在 `src/i18n/locales/` 下创建新的语言文件
2. 在 `src/i18n/index.ts` 中导入并添加到 `locales` 对象
3. 更新 `Locale` 类型定义
4. 在 `useLanguage` Hook 中添加语言选项
