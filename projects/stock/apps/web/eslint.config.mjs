// Official Next.js flat config merged with custom plugins and rules
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import storybook from "eslint-plugin-storybook";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
  // Next.js recommended configs
  ...nextVitals,
  ...nextTs,
  eslintPluginPrettierRecommended,

  // Custom plugins and rules
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off", // Turn off in favor of the unused-imports rule
      "prettier/prettier": ["error", { printWidth: 120 }],
      "react-hooks/exhaustive-deps": "off",

      // Import sorting
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "no-unused-vars": "off", // Turn off the ESLint core rule in favor of the unused-imports rule
      "unused-imports/no-unused-imports": "error", // Error on unused imports
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  ...storybook.configs["flat/recommended"],

  // Override default ignores from eslint-config-next
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
