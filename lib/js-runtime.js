// these are actually needed for the context of the eval
const lfMath = require('./lf-math')
const lfNum = require('./lf-num')
const validators = require('./validators')
const ApiError = require('./api-error')
const _ = require('./lodash-mixins')

module.exports = {
  exec: (javascript) => {
    try {
      return eval(javascript)
    } catch (ex) {
      throw new ApiError({
        code: 'LF_JS_EVAL_ERR',
        message: 'There was an error grading your report.',
        source: ex,
        details: javascript
      })
    }
  }
}
