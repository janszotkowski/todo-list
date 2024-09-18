import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import typescriptEslintParser from '@typescript-eslint/parser';
import stylisticPlugin from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default {
    name: 'ESLint Config',

    files: ['src/**/*.{js,jsx,ts,tsx}'],

    ignores: ['node_modules/', 'dist/'],

    languageOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: typescriptEslintParser,
        parserOptions: {
            project: './tsconfig.json',
            ecmaFeatures: {
                jsx: true,
            },
        },
        globals: {
            ...globals.browser,
            ...globals.node,
            myCustomGlobal: "readonly"
        }
    },

    plugins: {
        'react': reactPlugin,
        'react-hooks': reactHooksPlugin,
        '@typescript-eslint': typescriptEslintPlugin,
        'jsx-a11y': jsxA11yPlugin,
        '@stylistic': stylisticPlugin,
        'import': importPlugin
    },

    rules: {
        "no-duplicate-imports": "error",

        // Pravidla pro TypeScript
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
        '@typescript-eslint/no-explicit-any': 'off',
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                "accessibility": "explicit",
                "overrides": {
                    "accessors": "off",
                    "constructors": "explicit",
                    "methods": "explicit",
                    "properties": "explicit",
                    "parameterProperties": "explicit"
                }
            }
        ],
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/consistent-indexed-object-style": "error",

        // Pravidla pro React
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        'react/jsx-uses-vars': 'warn',
        "react/jsx-boolean-value": "error",

        // Pravidla pro React Hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',

        // Stylistická pravidla
        '@stylistic/indent': ['error', 4],
        '@stylistic/quotes': ['error', 'single'],
        '@stylistic/semi': ['error', 'always'],
        '@stylistic/no-trailing-spaces': 'error',
        '@stylistic/brace-style': ['error', '1tbs', {allowSingleLine: true}],
        '@stylistic/comma-dangle': ['error', 'always-multiline'],
        "@stylistic/jsx-props-no-multi-spaces": 'error',
        "@stylistic/space-before-blocks": "error",
        "@stylistic/jsx-curly-brace-presence": [
            "error",
            {
                "props": "always",
                "children": "never"
            }
        ],
        "@stylistic/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": true
                }
            }
        ],

        // Import pravidla
        "import/no-named-as-default": "off",
        "import/no-named-as-default-member": "off"
    },

    settings: {
        react: {
            version: 'detect',
        },
    },
};
