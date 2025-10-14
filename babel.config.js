module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
          '@/components': './src/components',
          '@/screens': './src/screens',
          '@/navigation': './src/navigation',
          '@/utils': './src/utils',
          '@/pages': './src/pages',
          '@/assets': './src/assets',
          '@/services': './src/services',
          '@/hooks': './src/hooks',
          '@/types': './src/types',
          '@/constants': './src/constants',
        }, 
      },
    ],
    'react-native-reanimated/plugin', // 添加这行
  ],
};
