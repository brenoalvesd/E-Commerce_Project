module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: ['tsconfig.json'],
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-empty-function': 'off',
    },
  };
  