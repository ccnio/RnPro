# Android SettingActivity 语言切换功能

## 功能概述

实现了完整的RN到原生界面的语言切换功能：

1. **Android SettingActivity**：原生设置页面，包含语言切换功能
2. **RN跳转按钮**：在Account页面添加跳转到SettingActivity的按钮
3. **自动语言同步**：从SettingActivity返回时，RN界面自动切换语言

## 文件结构

```
android/app/src/main/java/com/rnpro/
├── SettingActivity.java           # 原生设置页面
├── NativeNavigationModule.java    # 原生导航模块
├── NativeNavigationPackage.java   # 原生模块包
└── MainApplication.kt             # 主应用类（已更新）

src/
├── utils/NativeNavigation.ts      # RN导航工具
├── hooks/useLanguageDetection.ts  # 语言检测Hook
├── pages/Account.tsx              # Account页面（已更新）
└── i18n/index.ts                 # 国际化配置（已更新）
```

## 使用流程

### 1. 用户操作流程
```
1. 用户在RN Account页面
2. 点击"打开应用设置"按钮
3. 跳转到Android SettingActivity
4. 在SettingActivity中点击"切换语言"按钮
5. 语言切换后点击"返回RN页面"
6. RN页面自动检测语言变化并切换
```

### 2. 技术实现流程
```
RN页面 → NativeNavigationModule → SettingActivity → 语言切换 → 返回RN → useLanguageDetection → 自动切换
```

## 核心功能

### SettingActivity 功能
- ✅ 显示当前语言状态
- ✅ 一键切换中英文
- ✅ 实时更新界面语言
- ✅ 返回RN页面按钮

### RN层功能
- ✅ 跳转到原生设置页面
- ✅ 自动检测语言变化
- ✅ 页面重新获得焦点时检测
- ✅ 智能跟随系统语言

## 按钮说明

### Account页面按钮
- **切换语言**：在RN层直接切换语言
- **跟随系统语言**：重置为跟随系统语言
- **打开系统设置**：跳转到Android系统设置
- **打开应用设置**：跳转到自定义SettingActivity

### SettingActivity按钮
- **切换语言**：在中英文之间切换
- **返回RN页面**：关闭设置页面返回RN

## 技术特性

### 自动语言检测
- 使用 `useLanguageDetection` Hook
- 基于 `useFocusEffect` 实现
- 页面重新获得焦点时自动检测
- 跳过首次加载，避免误触发

### 智能跟随机制
- 用户手动设置语言后，不再跟随系统变化
- 只有未手动设置时才自动跟随
- 支持重新设置为跟随系统语言

### 原生模块通信
- 使用 `NativeNavigationModule` 实现RN到原生跳转
- 通过 `NativeModules` 调用原生方法
- 支持Android平台的原生Activity跳转

## 测试方法

1. **启动应用**：确保应用正常启动
2. **进入Account页面**：登录后进入Account页面
3. **点击"打开应用设置"**：应该跳转到SettingActivity
4. **在SettingActivity切换语言**：点击切换语言按钮
5. **返回RN页面**：点击返回按钮
6. **验证语言切换**：RN页面应该自动切换语言

## 注意事项

- 确保Android项目正确编译
- 需要重新构建Android应用
- 语言切换只在用户未手动设置时生效
- 页面首次加载不会触发语言检测
