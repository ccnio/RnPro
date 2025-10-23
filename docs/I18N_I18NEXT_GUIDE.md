# 国际化 (i18n) 使用指南 - i18next 版本

本项目使用 `react-native-localize`、`i18next` 和 `react-i18next` 实现专业的国际化解决方案。

## 技术栈

- **react-native-localize**: 获取系统语言和地区信息
- **i18next**: 核心国际化框架
- **react-i18next**: React/React Native 集成
- **MMKV**: 语言设置持久化存储

## 文件结构

```
src/i18n/
├── index.ts              # i18next 配置和初始化
├── locales/
│   ├── zh.ts            # 中文翻译
│   └── en.ts            # 英文翻译
└── hooks/
    └── useLanguage.ts   # 语言管理Hook
```

## 使用方法

### 1. 基本翻译

在任何组件中使用 `useLanguage` Hook：

```typescript
import { useLanguage } from '@/hooks/useLanguage';

const MyComponent = () => {
  const { t } = useLanguage();
  
  return (
    <Text>{t('account.loginButton')}</Text>
    <Text>{t('common.loading')}</Text>
  );
};
```

### 2. 语言切换

```typescript
import { useLanguage } from '@/hooks/useLanguage';

const LanguageSwitcher = () => {
  const { t, currentLocale, changeLanguage } = useLanguage();
  
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

在 `src/i18n/locales/zh.ts` 和 `src/i18n/locales/en.ts` 中添加新的翻译：

```typescript
// zh.ts
export default {
  myPage: {
    title: '我的页面',
    description: '这是一个描述',
  },
};

// en.ts
export default {
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

## RN跳转到原生界面的语言切换支持

### ✅ 支持从RN跳转到原生界面的语言切换

应用现在支持以下场景的语言切换：

1. **RN → 原生界面 → 切换语言 → 返回RN**：自动检测并切换语言
2. **页面焦点检测**：使用 `useLanguageDetection` Hook 自动检测语言变化
3. **手动检测**：提供 `checkLanguageChange` 函数手动检测语言变化

### 🔧 实现机制

#### 1. 页面焦点检测
```typescript
// src/hooks/useLanguageDetection.ts
export const useLanguageDetection = () => {
  const isFirstFocus = useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      // 跳过首次聚焦（页面初始加载）
      if (isFirstFocus.current) {
        isFirstFocus.current = false;
        return;
      }

      // 检测语言变化
      const hasLanguageChanged = checkLanguageChange();
      
      if (hasLanguageChanged) {
        console.log('页面重新获得焦点，检测到语言变化');
      }
    }, [])
  );
};
```

#### 2. 手动语言检测
```typescript
// src/i18n/index.ts
export const checkLanguageChange = () => {
  const currentSystemLanguage = getSystemLanguage();
  
  if (currentSystemLanguage !== lastSystemLanguage) {
    console.log('手动检测语言变化:', lastSystemLanguage, '->', currentSystemLanguage);
    
    // 检查是否有用户手动设置的语言
    const storedLang = storage.getString(LANGUAGE_STORAGE_KEY);
    
    // 如果没有用户设置，则跟随系统语言
    if (!storedLang) {
      i18n.changeLanguage(currentSystemLanguage);
    }
    
    lastSystemLanguage = currentSystemLanguage;
    return true; // 返回true表示语言发生了变化
  }
  
  return false; // 返回false表示语言没有变化
};
```

### 📱 使用方式

#### 在页面中使用自动检测
```typescript
import { useLanguageDetection } from '@/hooks/useLanguageDetection';

const MyPage = () => {
  // 自动检测从原生界面返回时的语言变化
  useLanguageDetection();
  
  return (
    // 页面内容
  );
};
```

#### 手动检测语言变化
```typescript
import { checkLanguageChange } from '@/i18n';

const handleSomeAction = () => {
  const hasChanged = checkLanguageChange();
  if (hasChanged) {
    console.log('语言发生了变化');
  }
};
```

### 🎯 支持的场景

- ✅ **设置页面**：RN跳转到原生设置页面，切换语言后返回
- ✅ **系统设置**：RN跳转到系统设置，切换语言后返回
- ✅ **第三方应用**：通过其他应用切换语言后返回
- ✅ **页面导航**：在RN页面间导航时检测语言变化

### ⚠️ 注意事项

- 只有在用户没有手动设置语言时才会跟随系统语言变化
- 页面首次加载时不会触发语言检测
- 需要确保原生界面正确触发系统语言变化

## 已国际化的页面

- ✅ Account页面 - 用户账户页面
- ✅ Login页面 - 登录页面  
- ✅ SearchBar组件 - 搜索栏组件
- ✅ BottomsTab导航 - 底部导航栏

## 初始化

国际化系统在 `App.tsx` 中自动初始化：

```typescript
import '@/i18n'; // 初始化国际化
```

## 语言存储

用户选择的语言会自动保存到 MMKV 存储中，键名为 `app_language`。

## 扩展支持

要添加更多语言支持：

1. 在 `src/i18n/locales/` 下创建新的语言文件
2. 在 `src/i18n/index.ts` 中导入并添加到 `resources` 对象
3. 在 `useLanguage.ts` 中更新 `availableLocales` 数组
4. 更新系统语言检测逻辑

## 优势

相比之前的自定义实现：

- **更专业**: 使用业界标准的 i18next 框架
- **更稳定**: 经过大量项目验证的成熟方案
- **更功能丰富**: 支持复数、插值、命名空间等高级特性
- **更好维护**: 社区支持好，文档完善
- **更易扩展**: 支持动态加载翻译资源
