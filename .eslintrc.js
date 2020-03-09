module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    '@vue/prettier',
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/typescript',
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'never',
      },
    ],
    'vue/arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'vue/block-spacing': ['error', 'always'],
    'vue/brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: false,
      },
    ],
    'vue/camelcase': [
      'error',
      {
        ignoreDestructuring: true,
        ignoreImports: true,
      },
    ],
    'vue/comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'vue/component-definition-name-casing': 'error',
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
    'vue/dot-location': ['error', 'object'],
    'vue/eqeqeq': ['error', 'always'],
    'vue/key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict',
      },
    ],
    'vue/keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'vue/match-component-file-name': [
      'error',
      {
        extensions: ['vue'],
        shouldMatchCase: true,
      },
    ],
    'vue/max-len': [
      'error',
      {
        code: 80,
        template: 80,
        tabWidth: 2,
        comments: 120,
        ignorePattern: '',
        ignoreComments: false,
        ignoreTrailingComments: false,
        ignoreUrls: false,
        ignoreStrings: false,
        ignoreTemplateLiterals: false,
        ignoreRegExpLiterals: false,
        ignoreHTMLAttributeValues: false,
        ignoreHTMLTextContents: false,
      },
    ],
    'vue/no-boolean-default': ['error', 'default-false'],
    // 'vue/no-deprecated-scope-attribute': 'error', PUG?
    // 'vue/no-deprecated-slot-attribute': 'error', PUG?
    // 'vue/no-deprecated-slot-scope-attribute': 'error', PUG ?
    'vue/no-empty-pattern': 'error',
    'vue/no-irregular-whitespace': [
      'error',
      {
        skipStrings: false,
        skipComments: false,
        skipRegExps: false,
        skipTemplates: false,
        skipHTMLAttributeValues: false,
        skipHTMLTextContents: false,
      },
    ],
    'vue/no-reserved-component-names': 'error',
    // 'vue/no-restricted-syntax': 'error',
    'vue/no-static-inline-styles': [
      'error',
      {
        allowBinding: false,
      },
    ],
    'vue/no-unsupported-features': [
      'error',
      {
        version: '^2.6.0',
        ignores: [],
      },
    ],
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/require-direct-export': 'error',
    'vue/require-name-property': 'error',
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 0,
        switchCase: 0,
        ignores: [],
      },
    ],
    'vue/space-infix-ops': ['error', { int32Hint: false }],
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false,
        overrides: {
          'new': false,
          '++': true,
        },
      },
    ],
    // 'vue/static-class-names-order': 'error', PUG ?
    'vue/v-on-function-call': ['error', 'never'],
    'vue/v-slot-style': [
      'error',
      {
        atComponent: 'longform',
        default: 'longform',
        named: 'longform',
      },
    ],
    'vue/valid-v-bind-sync': 'error',
    'vue/valid-v-slot': 'error',
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
