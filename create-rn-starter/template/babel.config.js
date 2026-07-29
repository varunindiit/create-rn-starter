module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Path aliases — keeps imports as `@/theme` instead of `../../../theme`.
    // The same map is mirrored in tsconfig.json `paths` so the editor and the
    // bundler agree; changing one without the other breaks at runtime only.
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
          '.svg',
        ],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@screens': './src/screen',
          '@services': './src/services',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@redux': './src/redux',
          '@assets': './src/assets',
          '@hooks': './src/hooks',
        },
      },
    ],
    // Reads .env and inlines the values behind the `@env` module. Restart Metro
    // with --reset-cache after editing .env or the old values stay compiled in.
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
      },
    ],
    // Must stay last — the worklets plugin has to see the final AST.
    'react-native-worklets/plugin',
  ],
};
