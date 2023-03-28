module.exports = {
  // Configuration for JavaScript files
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals", // Needed to avoid warning in next.js build: 'The Next.js plugin was not detected in your ESLint configuration'
    "plugin:prettier/recommended"
  ],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "endOfLine": "auto"
      }
    ]
  },
  "overrides": [
    // Configuration for TypeScript files
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "plugins": [
        "@typescript-eslint",
        "unused-imports",
        "tailwindcss",
        "simple-import-sort"
      ],
      "extends": [
        "plugin:tailwindcss/recommended",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "next/core-web-vitals",
        "plugin:prettier/recommended"
      ],
      "parserOptions": {
        "project": ['./tsconfig.json','./tsconfig.server.json']
      },
      "rules": {
        "prettier/prettier": [
          "error",
          {
            "singleQuote": true,
            "endOfLine": "auto"
          }
        ],
        "react/destructuring-assignment": "off", // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
        "react/require-default-props": "off", // Allow non-defined react props as undefined
        "react/jsx-props-no-spreading": "off", // _app.tsx uses spread operator and also, react-hook-form
        "react-hooks/exhaustive-deps": "off", // Incorrectly report needed dependency with Next.js router
        "react/display-name": "off",
        "@next/next/no-img-element": "off", // We're currently not using next/image because it isn't supported with SSG mode
        "@typescript-eslint/comma-dangle": "off", // Avoid conflict rule between Eslint and Prettier
        "@typescript-eslint/consistent-type-imports": "error", // Ensure `import type` is used when it's necessary
        "@typescript-eslint/ban-ts-comment": "off",
        "import/prefer-default-export": "off", // Named export is easier to refactor automatically
        "simple-import-sort/imports": "error", // Import configuration for `eslint-plugin-simple-import-sort`
        "simple-import-sort/exports": "error", // Export configuration for `eslint-plugin-simple-import-sort`
        "@typescript-eslint/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
          "error",
          { "argsIgnorePattern": "^_" }
        ],
        "@typescript-eslint/no-explicit-any": "off", // Cho phep su dung any
        "no-prototype-builtins": "off",
        "@next/next/no-html-link-for-pages": "off",
      }
    },
    // Configuration for testing
    {
      "files": ["**/*.test.ts", "**/*.test.tsx"],
      "plugins": ["jest", "jest-formatting", "testing-library", "jest-dom"],
      "extends": [
        "plugin:jest/recommended",
        "plugin:jest-formatting/recommended",
        "plugin:testing-library/react",
        "plugin:jest-dom/recommended"
      ]
    },
    // TODO: implement if needed https://github.com/ixartz/Next-js-Boilerplate
    // Configuration for e2e testing (Cypress)
    // {
    //   "files": ["cypress/**/*.ts"],
    //   "plugins": ["cypress"],
    //   "extends": ["plugin:cypress/recommended"],
    //   "parserOptions": {
    //     "project": "./cypress/tsconfig.json"
    //   }
    // }
  ]
};
