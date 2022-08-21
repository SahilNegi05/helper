module.exports = {
  extends: 'imbudhiraja/react',
  parser: '@babel/eslint-parser',
  rules: {
    camelcase: 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'max-len': [2, { code: 256, "ignoreTemplateLiterals": true, "ignoreStrings": true, ignoreUrls: true, tabWidth: 4 }],
    'max-lines': ['error', { max: 1000, skipComments: true, skipBlankLines: true }],
    'no-alert': 'off',
    'no-script-url': 'off',
    'no-underscore-dangle': ['error', { allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] }],
    'react/forbid-foreign-prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
