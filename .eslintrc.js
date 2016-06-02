//Use this file as a starting point for the project's .eslintrc.js
module.exports = {
  extends: 'airbnb',
  rules: {
    'react/jsx-no-bind': [2, {
      ignoreRefs: true,
      allowArrowFunctions: true,
      allowBind: true,
    }],
  }
}
