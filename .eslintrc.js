module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    // Reglas personalizadas
    'no-unused-vars': 'warn',
    'no-console': 'off',
  },
};
