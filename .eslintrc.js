module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': 0,
    // allow optionalDependencies
    'import/no-extraneous-dependencies': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // custom rules
    'comma-dangle': 0,
    'import/first': 0,
    'import/no-unresolved': 0,
    'import/no-dynamic-require': 0,
    'import/prefer-default-export': 0,
    'no-console': 0,
    'no-trailing-spaces': 0,
    'global-require': 0,
    'no-param-reassign': 0,
    'camelcase': 0,
    'no-undef': 0,
    'no-underscore-dangle': 0,
    'prefer-const': 0,
    'consistent-return': 0,
    'array-callback-return': 0,
    'no-nested-ternary': 0,
    'no-confusing-arrow': 0,
    'no-unused-expressions': 0,
    'prefer-arrow-callback': 0,
    'class-methods-use-this': 0,
    'no-useless-escape': 0,
    'no-multi-spaces': ['error', {
      'exceptions': {
        'ImportDeclaration': true,
        'VariableDeclarator': true
      }
    }]
  }
};
