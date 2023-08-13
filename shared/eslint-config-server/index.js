module.exports = {
  env: {
    node: true,
    jest: true
  },
  // Configuration for JavaScript files
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        endOfLine: "auto",
        "trailingComma": "all"
      }
    ]
  },
  overrides: [
    // Configuration for TypeScript files
    {
      files: ["**/*.ts", "**/*.tsx"],
      // Plugin giúp mở rộng chức năng và quy tắc
      plugins: [
        "@typescript-eslint",
        "unused-imports",
        "simple-import-sort"
      ],
      // Extends là sử dụng những quy tắc đã được thiết lập sẵn
      extends: [
        "airbnb-base",
        "airbnb-typescript/base",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
      ],
      // extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
      parserOptions: {
        project: "./tsconfig.json"
      },
      rules: {
        "prettier/prettier": [
          "error",
          {
            singleQuote: true,
            endOfLine: "auto"
          }
        ],
        "@typescript-eslint/comma-dangle": "off", // Avoid conflict rule between Eslint and Prettier
        "@typescript-eslint/consistent-type-imports": "error", // Ensure `import type` is used when it's necessary
        "simple-import-sort/imports": "error", // Import configuration for `eslint-plugin-simple-import-sort`
        "simple-import-sort/exports": "error", // Export configuration for `eslint-plugin-simple-import-sort`
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/ban-ts-comment": "off", // Cho phep su dung ts-ignore,
        "@typescript-eslint/no-explicit-any": "off", // Cho phep su dung any
        "no-prototype-builtins": "off", // Cho phep su dung hasOwnProperty
        "import/no-extraneous-dependencies": "off", // Cho phep import tu global
        "import/prefer-default-export": "off", // Bo qua default export,
        "class-methods-use-this": "off",
        "prefer-regex-literals": "off",
        "@typescript-eslint/naming-convention": "off",
        "no-underscore-dangle": "off",
        "radix": "off",
        "no-console": "off",
        "no-plusplus": "off",
        "no-await-in-loop": "off",
        "no-param-reassign": "warn",
        "no-nested-ternary": "warn",
        "consistent-return": "warn",
        "import/order": "off" // Conflict with simple import
      }
    },
    // Configuration for testing
    {
      files: ["**/*.test.ts"],
      plugins: ["jest", "jest-formatting"],
      extends: [
        "plugin:jest/recommended",
        "plugin:jest-formatting/recommended"
      ],
      rules: {
        "jest/no-mocks-import": "off"
      }
    }
  ]
};
