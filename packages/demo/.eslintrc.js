module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'google', 'plugin:prettier/recommended'],
  plugins: ['jsdoc', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': 'error',
    semi: ['error', 'always'],
    'no-implicit-coercion': 'error',
    'no-undef': 'off',
    indent: 'off',
    'no-unused-vars': 'warn',
    'object-curly-spacing': 'off',
  },
};
