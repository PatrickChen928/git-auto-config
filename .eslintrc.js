module.exports = {
  root: true,
  env: {
    es6: true, // 支持新的 ES6 全局变量，同时自动启用 ES6 语法支持
    node: true, // 启动node环境
    browser: true // 浏览器环境中的全局变量。
  },
  globals: {},
  extends: ['prettier', '@antfu'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['off'],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true, // 忽略 import 声明语句的排序。
        ignoreMemberSort: true // 忽略有多个成员的 import 声明的排序。
      }
    ],
    'guard-for-in': 'error',
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'arrow-parens': ['error', 'as-needed'],
    'prefer-template': ['off']
  },
  parserOptions: {
    ecmaVersion: 2020
  }
}
