module.exports = {
  env: {
    node: true,
    jest: true,
  },
  // Configuration for JavaScript files
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
        "trailingComma": "all"
      },
    ],
  },
  overrides: [
    // Configuration for TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['@typescript-eslint', 'unused-imports', 'simple-import-sort'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            endOfLine: 'auto',
          },
        ],
        '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
        '@typescript-eslint/consistent-type-imports': 'error', // Ensure `import type` is used when it's necessary
        'simple-import-sort/imports': 'error', // Import configuration for `eslint-plugin-simple-import-sort`
        'simple-import-sort/exports': 'error', // Export configuration for `eslint-plugin-simple-import-sort`
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/ban-ts-comment': 'off', // Cho phep su dung ts-ignore,
        '@typescript-eslint/no-explicit-any': 'off', // Cho phep su dung any
        'no-prototype-builtins': 'off', // Cho phep su dung hasOwnProperty

      },
    },
    // Configuration for testing
    {
      files: ['**/*.test.ts'],
      plugins: ['jest', 'jest-formatting'],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest-formatting/recommended',
      ],
      rules: {
        'jest/no-mocks-import': 'off',
      },
    },
  ],
};
