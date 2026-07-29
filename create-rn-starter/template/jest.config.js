module.exports = {
  preset: '@react-native/jest-preset',
  // Reanimated 4 runs on the Worklets runtime, whose `.native` entrypoints
  // need a real JSI host. This resolver (shipped by the package) points Jest
  // at the plain-JS implementations instead.
  resolver: 'react-native-worklets/jest/resolver.js',
  // Only scan the app itself. Without this, a checkout of this repo would also
  // walk the packaged copy under create-rn-starter/template.
  roots: ['<rootDir>/src', '<rootDir>/__tests__'],
  setupFiles: ['react-native-gesture-handler/jestSetup', './jest.setup.js'],
  // RNTL v14 registers its jest matchers automatically — no extend-expect.
  // Mirrors the aliases in babel.config.js / tsconfig.json.
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@screens/(.*)$': '<rootDir>/src/screen/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@redux/(.*)$': '<rootDir>/src/redux/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-.*|@react-navigation|react-redux|@reduxjs|immer|redux)/)',
  ],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/assets/**'],
};
