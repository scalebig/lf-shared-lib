const _ = require('lodash')
_.mixin({
  'isNullish': arg => (_.isNull(arg) || _.isUndefined(arg))
})

module.exports = _
