const localeDefinition = require('./locale-definition')

function getDescendantProp (obj, desc) {
  var arr = desc.split('.')
  while (arr.length) {
    obj = obj[arr.shift()]
  }
  return obj
}
module.exports = function (propPath) {
  let userLang = 'en'
  if (require('./node-detect')) {
    // node
  } else {
    // browser
    userLang = require('browser-locale')().split('-')[0]
  }

  let selectedDefinition = localeDefinition['en']

  if (localeDefinition[userLang]) {
    selectedDefinition = localeDefinition[userLang]
  }

  let objContext = getDescendantProp(selectedDefinition, propPath)
  return Object.assign({globals: selectedDefinition.globals}, objContext)
}
