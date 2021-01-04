module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _assets: './src/assets',
          _components: './src/components',
          _redux: './src/redux',
          _routes: './src/routes',
          _screens: './src/screens',
          _styles: './src/styles',
          _utils: './src/utils',
        },
      },
    },
  },
};
