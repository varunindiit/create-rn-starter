module.exports = {
  root: true,
  extends: '@react-native',
  // Harmless in a generated project (nothing matches); in this repo it keeps
  // ESLint out of the packaged copy under create-rn-starter/template.
  ignorePatterns: ['create-rn-starter/'],
  overrides: [
    {
      // Jest globals are only in scope for the setup file and the suites
      // themselves — declaring them project-wide would hide real typos.
      files: [
        '**/__tests__/**/*.{js,jsx,ts,tsx}',
        '**/*.{spec,test}.{js,jsx,ts,tsx}',
        'jest.setup.js',
      ],
      env: {jest: true},
    },
  ],
};
