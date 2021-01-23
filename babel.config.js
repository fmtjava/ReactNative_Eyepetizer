module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./ts'],
        alias: {
          '@/assets': './ts/assets',
          '@/components': './ts/components',
          '@/config': './ts/config',
          '@/model': './ts/model',
          '@/navigator': './ts/navigator',
          '@/page': './ts/page',
          '@/utils': './ts/utils',
        },
      },
    ],
  ],
};
