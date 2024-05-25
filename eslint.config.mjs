import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
export default [
  {
    ignores: ['/node_modules/', '.dist/'],
    languageOptions: {
      globals: {
        ...globals.browser,
        process: 'readonly',
      },
    },

    // extends: [
    //   'eslint:recommended',
    //   'plugin:@typescript-eslint/recommended',
    //   'prettier',
    // ],

    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
]
