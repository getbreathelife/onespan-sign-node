const rules = {
  'no-unused-vars': 'off',
  'no-case-declarations': 'off',
  'no-async-promise-executor': 'warn',
  'no-useless-escape': 'off',
  'no-fallthrough': 'warn',
  'no-redeclare': 'warn',
  'no-empty': 'warn',
  'no-irregular-whitespace': 'off',
  'no-duplicate-imports': 'error',
  'no-await-in-loop': 'warn',

  'import/no-extraneous-dependencies': [
    'error',
    {
      peerDependencies: true,
    },
  ],

  // the base rule does not work correctly for TS enums
  'no-use-before-define': 'off',
  // function declarations are hoisted so this is fine
  '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
  '@typescript-eslint/ban-ts-comment': 'off',
  '@typescript-eslint/ban-types': 'warn',
  '@typescript-eslint/no-inferrable-types': 'off',
  '@typescript-eslint/explicit-function-return-type': [
    'warn',
    {
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true,
      allowExpressions: true,
    },
  ],
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/no-var-requires': 'warn',
  '@typescript-eslint/no-namespace': 'warn',

  // eslint has issues with scope analysis and ts interfaces
  // https://github.com/typescript-eslint/typescript-eslint/issues/342
  // tsc should catch this already
  'no-undef': 'off',
  '@typescript-eslint/no-empty-interface': 'warn',

  '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }],

  '@typescript-eslint/naming-convention': [
    'warn',
    { selector: 'default', format: ['camelCase'], leadingUnderscore: 'allow' },
    {
      selector: 'typeLike',
      format: ['PascalCase'],
    },
    {
      selector: 'memberLike',
      format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
    },
    {
      selector: 'function',
      format: ['camelCase', 'PascalCase'],
    },
    {
      selector: 'variable',
      format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
    },
  ],
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/interface-name-prefix': 'off',
  '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',

  'tsdoc/syntax': 'error',
};

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  extends: ['eslint:recommended'],
  ignorePatterns: ['**/dist/', '**/node_modules/'],
  env: {
    node: true,
    jest: true,
  },
  overrides: [
    {
      files: ['*.ts'],
      plugins: ['@typescript-eslint/eslint-plugin', 'import', 'tsdoc'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      parserOptions: {
        project: ['./tsconfig.json', './tests/tsconfig.json'],
        ecmaVersion: 2019,
        sourceType: 'module',
      },
      rules,
    },
  ],
};
