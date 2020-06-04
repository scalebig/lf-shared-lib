const copy = require('./copy')
const _ = require('./lodash-mixins')

function creaeteSerializableError (err) {
  let out = {}

  if (!(err instanceof Error)) {
    throw new TypeError('invalid input argument. Must provide an error object. Value: `' + err + '`.')
  }
  out = {}

  out.type = (err.constructor && err.constructor.name) || 'Error'
  out.message = err.message

  if (err.name) {
    out.name = err.name
  }
  if (err.stack) {
    out.stack = err.stack
  }

  if (err.stack) {
    out.stack = err.stack
    if (_.isString(out.stack)) {
      out.stackList = out.stack.split('\n')
    }
  }

  // Possible Node.js (system error) properties...
  if (err.code) {
    out.code = err.code
  }
  if (err.errno) {
    out.errno = err.errno
  }
  if (err.syscall) {
    out.syscall = err.syscall
  }

  let sourceErrorProperties = copy(err, true)

  // these already captured at the top level
  delete sourceErrorProperties['name']
  delete sourceErrorProperties['message']
  delete sourceErrorProperties['stack']
  delete sourceErrorProperties['code']
  delete sourceErrorProperties['errno']
  delete sourceErrorProperties['syscall']

  out.sourceProperties = sourceErrorProperties

  return out
}

class ApiError extends Error {
  constructor (args) {
    super('LF_API_ERROR')
    Error.captureStackTrace(this, ApiError)
    this.messageList = []
    this.isApiError = true
    // this.primarySource = args.source instanceof Error ? errorToJson(args.source) : args.source
    this.primarySource = args.source instanceof Error ? creaeteSerializableError(args.source) : args.source
    if (args.code && args.code.indexOf('LF_') === 0) {
      this.messageList.push({
        code: args.code,
        message: args.message,
        source: this.primarySource
      })
    }
    this.primaryCode = args.code
    this.primaryMessage = args.message
    this.details = args.details
    this.httpCode = args.httpCode || 500
  }

  addMessage (args) {
    this.messageList.push(args)
  }
}

module.exports = ApiError
