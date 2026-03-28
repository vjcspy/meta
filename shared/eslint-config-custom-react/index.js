import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';
import {globalIgnores} from 'eslint/config'
import globals from 'globals'

export default tseslint.config([
        // Base configuration for JavaScript files
        {
            files: ['**/*.js', '**/*.jsx'],
            extends: [
                js.configs.recommended,
                eslintConfigPrettier,
            ],
            languageOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                globals: {
                    module: 'readonly',
                    require: 'readonly',
                    process: 'readonly',
                    __dirname: 'readonly',
                    __filename: 'readonly',
                },
            },
            plugins: {
                'simple-import-sort': simpleImportSort,
                'unused-imports': unusedImports,
                prettier: eslintPluginPrettier,
            },
            rules: {
                'prettier/prettier': ['error', {singleQuote: true, endOfLine: 'auto'}],
                'simple-import-sort/imports': 'error',
                'simple-import-sort/exports': 'error',
                'unused-imports/no-unused-imports': 'error',
                'unused-imports/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
            },
        },
        // Configuration for TypeScript files
        {
            files: ['**/*.ts', '**/*.tsx'],
            extends: [
                js.configs.recommended,
                ...tseslint.configs.recommended,
                eslintConfigPrettier,
            ],
            languageOptions: {
                parser: tseslint.parser,
                parserOptions: {
                    project: ['./tsconfig.json'],
                    ecmaVersion: 'latest',
                    sourceType: 'module',
                },
                globals: globals.browser,
            },
            plugins: {
                '@typescript-eslint': tseslint.plugin,
                'simple-import-sort': simpleImportSort,
                'unused-imports': unusedImports,
                prettier: eslintPluginPrettier,
            },
            rules: {
                'prettier/prettier': ['error', {singleQuote: true, endOfLine: 'auto'}],
                '@typescript-eslint/consistent-type-imports': 'error',
                'simple-import-sort/imports': 'error',
                'simple-import-sort/exports': 'error',
                'unused-imports/no-unused-imports': 'error',
                'unused-imports/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
                'react/destructuring-assignment': 'off',
                'react/require-default-props': 'off',
                '@next/next/no-img-element': 'off',
                '@typescript-eslint/ban-ts-comment': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-empty-object-type': 'off',
                'no-prototype-builtins': 'off',
                '@typescript-eslint/no-unused-vars': 'off',
            },
        },
        globalIgnores(['node_modules/**', '.next/**', 'out/**', 'build/**', 'dist/**', '.storybook/**', 'stories/**', 'vite.config.ts'])
    ]
);
