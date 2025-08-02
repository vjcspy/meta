# ESLint v9 Migration Plan for Monorepo

## 🎯 **IMPORTANT: Scope of Application**

> **⚠️ APPLIES TO SINGLE PACKAGE ONLY**: `e:\js\meta\projects\stock\packages\redux\`
> 
> **Reason**: This is the **FIRST TEST CASE** in a large monorepo with many modules/packages. We will:
> - Implement and test ESLint v9 on this package first
> - Verify stability and effectiveness
> - Only run lint tests on this package
> - After success, apply to other packages
> 
> **Do not**: Update all packages at once to avoid risks and ease debugging

## 📋 Current Analysis

> **Note**: This is a monorepo using **pnpm** and **pnpm workspace**. All commands will use `pnpm` instead of `npm`.

### Current ESLint packages to handle:
- `eslint` (v8.57.1) → upgrade to v9
- `@typescript-eslint/eslint-plugin` & `@typescript-eslint/parser` → v9 compatible
- `eslint-config-airbnb-base`, `eslint-config-airbnb-typescript` → **remove** (not compatible)
- `eslint-config-next`, `eslint-config-prettier` → keep
- `eslint-plugin-prettier`, `eslint-plugin-simple-import-sort` → keep
- Add `eslint-plugin-unused-imports` → need to install

### New minimal dependencies:
```json
{
  "eslint": "^9.0.0",
  "typescript-eslint": "^8.0.0",
  "eslint-config-next": "latest",
  "eslint-config-prettier": "^9.0.0",
  "eslint-plugin-prettier": "^5.0.0",
  "eslint-plugin-simple-import-sort": "^12.0.0",
  "eslint-plugin-unused-imports": "^4.0.0",
  "prettier": "^3.0.0"
}
```

## **⚠️ CRITICAL RULES - MANDATORY RULES FOR AI AGENTS**

> **🚨 IMPORTANT**: These rules MUST be strictly followed to avoid mistakes during migration.

### **📋 List of Mandatory Rules:**

#### **1. 🎯 FOLLOW CORRECT LOCATION ACCORDING TO PLAN**
- ❌ **NEVER** create files at root level when plan requires nested location
- ✅ **ALWAYS** read the plan carefully and create files at the specified location
- ✅ **EXAMPLE**: If plan says create at `projects/stock/packages/redux/`, DO NOT create at root

#### **2. 📦 USE SHARED MODULES CORRECTLY**
- ❌ **NEVER** create separate config when shared module exists
- ❌ **NEVER** use relative path for shared modules: `../../../shared/module`
- ✅ **ALWAYS** import from module name: `import config from 'module-name'`
- ✅ **REASON**: Shared modules have their own package.json and are resolved via Node.js module resolution

#### **3. 🔄 FOLLOW PLAN AND UPDATE**
- ✅ **ALWAYS** read the entire plan before starting
- ✅ **ALWAYS** update plan when there are important changes
- ✅ **ALWAYS** test thoroughly after each step

#### **4. 🧪 TESTING AND VALIDATION**
- ✅ **ALWAYS** test ESLint after creating config
- ✅ **ALWAYS** fix formatting errors before finishing
- ✅ **ALWAYS** ensure exit code = 0 for all commands

#### **5. 🗂️ LEGACY FILE MANAGEMENT**
- ✅ **ALWAYS** delete `.eslintrc.*` and `.eslintignore` after migration
- ✅ **ALWAYS** add `"type": "module"` to package.json when needed
- ✅ **ALWAYS** update lint scripts in package.json

### **🎯 Purpose of Rules:**
- Avoid repeating mistakes that have occurred
- Ensure consistency across the entire monorepo
- Increase efficiency and reduce debugging time
- Ensure shared modules are used correctly

---

## 🔄 Implementation Plan (3 phases)

### **Phase 1: Preparation and Cleanup**
1. **Backup current configuration**
   ```bash
   # Backup all .eslintrc files
   find . -name ".eslintrc*" -exec cp {} {}.backup \;
   ```

2. **Remove incompatible and unnecessary packages:**
   ```bash
   # Remove old/incompatible packages from root workspace
   pnpm remove -w @typescript-eslint/eslint-plugin @typescript-eslint/parser
   pnpm remove -w eslint-config-airbnb-base eslint-config-airbnb-typescript
   pnpm remove -w eslint-config-turbo
   pnpm remove -w eslint-plugin-cypress eslint-plugin-import
   pnpm remove -w eslint-plugin-jest eslint-plugin-jest-dom eslint-plugin-jest-formatting
   pnpm remove -w eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
   pnpm remove -w eslint-plugin-tailwindcss eslint-plugin-testing-library
   
   # Or remove from all packages (if needed)
   pnpm remove -r @typescript-eslint/eslint-plugin @typescript-eslint/parser
   pnpm remove -r eslint-config-airbnb-base eslint-config-airbnb-typescript
   pnpm remove -r eslint-config-turbo eslint-plugin-cypress eslint-plugin-import
   pnpm remove -r eslint-plugin-jest eslint-plugin-jest-dom eslint-plugin-jest-formatting
   pnpm remove -r eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
   pnpm remove -r eslint-plugin-tailwindcss eslint-plugin-testing-library
   ```
   
   **Packages to keep:**
   - `eslint-config-next` (needed for Next.js)
   - `eslint-config-prettier` (v9 compatible)
   - `eslint-plugin-prettier` (v9 compatible)
   - `eslint-plugin-simple-import-sort` (v9 compatible)
   - `eslint-plugin-unused-imports` (v9 compatible)

3. **Delete all `.eslintrc.js` and `.eslintignore` files**
   ```bash
   find . -name ".eslintrc*" -delete
   find . -name ".eslintignore" -delete
   ```

### **Phase 2: Update Dependencies**

```bash
# Install ESLint v9 and new dependencies to root workspace
pnpm add -Dw eslint@^9.0.0 typescript-eslint@^8.0.0
pnpm add -Dw eslint-config-prettier@^9.0.0
pnpm add -Dw eslint-plugin-prettier@^5.0.0
pnpm add -Dw eslint-plugin-simple-import-sort@^12.0.0
pnpm add -Dw eslint-plugin-unused-imports@^4.0.0
pnpm add -Dw prettier@^3.0.0

# Or install for all packages in workspace
pnpm add -Dr eslint@^9.0.0 typescript-eslint@^8.0.0
```

### **Phase 3: Update Shared Configurations**

**Important: Add `"type": "module"` to package.json first**

#### **eslint-config-server** (for Node.js/NestJS projects):

**File: `shared/eslint-config-server/package.json`**
```json
{
  "name": "eslint-config-server",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "peerDependencies": {
    "eslint": ">= 9"
  }
}
```

```javascript
// shared/eslint-config-server/index.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config(
  // Base JavaScript configuration
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    extends: [js.configs.recommended, eslintConfigPrettier],
    languageOptions: {
      globals: {
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        console: "readonly"
      },
      ecmaVersion: "latest",
      sourceType: "module"
    },
    plugins: { prettier: eslintPluginPrettier },
    rules: {
      "prettier/prettier": ["error", { singleQuote: true, endOfLine: "auto" }]
    }
  },
  // TypeScript configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      prettier: eslintPluginPrettier
    },
    rules: {
      "prettier/prettier": ["error", { singleQuote: true, endOfLine: "auto" }],
      "@typescript-eslint/consistent-type-imports": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
      "no-param-reassign": "warn",
      "no-nested-ternary": "warn",
      "consistent-return": "warn"
    }
  },
  // Test files
  {
    files: ["**/*.test.ts", "**/*.spec.ts"],
    languageOptions: {
      globals: {
        jest: "readonly",
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly"
      }
    }
  },
  // Ignores
  {
    ignores: ["node_modules/**", "dist/**", "build/**", ".next/**"]
  }
);
```

#### **eslint-config-nextjs** (for Next.js projects):

**File: `shared/eslint-config-nextjs/package.json`**
```json
{
  "name": "eslint-config-nextjs",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "peerDependencies": {
    "eslint": ">= 9"
  }
}
```

```javascript
// shared/eslint-config-nextjs/index.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigNext from "eslint-config-next";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config(
  // Base configuration
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigNext,
      eslintConfigPrettier
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      prettier: eslintPluginPrettier
    },
    rules: {
      "prettier/prettier": ["error", { singleQuote: true, endOfLine: "auto" }],
      "@typescript-eslint/consistent-type-imports": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "react/destructuring-assignment": "off",
      "react/require-default-props": "off",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off"
    }
  },
  // Ignores
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**"]
  }
);
```

### **Phase 4: Update Redux Package (TEST CASE)**

> **🎯 APPLIES TO**: `e:\js\meta\projects\stock\packages\redux\`

#### **⚠️ IMPORTANT: Use Shared Configuration**

> **Principle**: Redux package MUST use shared configuration from `eslint-config-server` instead of creating separate config. This is why we create shared modules.

#### **Create eslint.config.js for Redux package (USING SHARED CONFIG):**
```javascript
// projects/stock/packages/redux/eslint.config.js
import eslintConfigServer from 'eslint-config-server';

export default eslintConfigServer;
```

**Benefits of using shared config:**
- ✅ Reuse tested configuration
- ✅ Maintain consistency across the entire monorepo
- ✅ Easy to update rules from a single place
- ✅ Minimize code duplication
- ✅ Shared config already has `@typescript-eslint/no-explicit-any: 'off'`

#### **Test Commands for Redux Package:**
```bash
# Navigate to redux package directory
cd projects/stock/packages/redux

# Test ESLint configuration
npx eslint . --dry-run

# Run lint with fix
npx eslint . --fix

# Or use pnpm from root
pnpm --filter="@stock/packages-redux" exec eslint . --fix
```

## 🎯 Prettier Configuration

Create `.prettierrc.js` at root:
```javascript
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  printWidth: 80,
  endOfLine: 'auto'
};
```

## 📁 Directory structure after migration (REDUX PACKAGE ONLY)

```
e:\js\meta
├── .prettierrc.js            # Prettier config (if needed)
├── shared/
│   ├── eslint-config-server/
│   │   ├── package.json      # Updated with "type": "module"
│   │   └── index.js          # ESLint v9 config for server
│   └── eslint-config-nextjs/
│       ├── package.json      # Updated with "type": "module"
│       └── index.js          # ESLint v9 config for Next.js
└── projects/
    └── stock/
        └── packages/
            └── redux/
                ├── eslint.config.js  # ✅ NEW: ESLint v9 flat config
                ├── package.json      # May need to update scripts
                └── src/              # Source code to test
```

> **⚠️ Note**: Other packages/projects will NOT be changed in this iteration

## ✅ Implementation Checklist (REDUX PACKAGE ONLY)

### **Preparation phase:**
- [x] **Node.js version ≥ 18.18.0** (requirement for ESLint v9)
- [x] Backup current ESLint configuration (if any)
- [x] Update shared configurations (`eslint-config-server`, `eslint-config-nextjs`)
- [x] Add `"type": "module"` to shared config packages

### **Implementation phase:**
- [x] Create `eslint.config.js` for Redux package
- [ ] **Test ESLint on Redux package**:
  ```bash  
  # Navigate to redux directory
  cd projects/stock/packages/redux
  
  # Test configuration
  npx eslint . --dry-run
  
  # Run lint with fix
  npx eslint . --fix
  
  # Or from root workspace
  pnpm --filter="@stock/packages-redux" exec eslint . --fix
  ```
- [ ] Verify no ESLint errors
- [ ] Verify correct code formatting
- [ ] Test build process still works

### **Validation phase:**
- [ ] Run `pnpm lint` in Redux package
- [ ] Check VS Code ESLint extension works
- [ ] Verify performance (lint time)
- [ ] Document test results

### **After success:**
- [ ] Create template for other packages
- [ ] Plan rollout for entire monorepo
- [ ] Update documentation

## 🚀 Benefits

- **Minimal dependencies**: Only keep what's truly necessary
- **Modern configuration**: Use `typescript-eslint` with `tseslint.config`
- **Better performance**: ESLint v9 has better performance
- **Future-proof**: Ready for future versions
- **Consistent**: Unified configuration across entire monorepo
- **Reusable**: Shared configurations can be easily reused

## ⚠️ Important Notes

### ES Modules for Shared Configs
- **Recommended**: Add `"type": "module"` to `package.json` of shared config packages
- Allows using modern `import`/`export` syntax
- Follows ESLint v9 flat config best practices
- Better compatibility with modern JavaScript ecosystem

### Flat Config Format
- **Flat config** is mandatory in ESLint v9
- No longer supports `.eslintignore`, must use `ignores` in config
- Plugins must be imported as JavaScript objects
- Shared configurations must export default a config object/array
- Need to check plugin compatibility with ESLint v9

## 🔧 Troubleshooting

### Common errors:

1. **"Cannot resolve module"**: Ensure correct dependencies are installed
2. **"Flat config not supported"**: Check ESLint version ≥ 9.0.0
3. **"Plugin not found"**: Import plugin as JavaScript object instead of string
4. **"Parser error"**: Check `parserOptions.project` path

### Useful commands for pnpm workspace:

```bash
# Check ESLint version
pnpm exec eslint --version

# Test config
pnpm exec eslint --print-config src/index.ts

# Lint and fix from root
pnpm exec eslint . --fix

# Lint specific workspace
pnpm --filter="workspace-name" exec eslint . --fix

# Lint all workspaces
pnpm -r exec eslint . --fix

# Lint specific files
pnpm exec eslint "src/**/*.{ts,tsx}" --fix

# Install dependencies for specific workspace
pnpm --filter="workspace-name" add -D package-name

# Install dependencies for root workspace
pnpm add -Dw package-name
```

---

**Author**: AI Assistant  
**Created**: $(date)  
**Version**: 1.0