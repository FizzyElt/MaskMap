module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  parserOptions: {
    sourceType: 'module',
  },
  parser: 'babel-eslint',
}
