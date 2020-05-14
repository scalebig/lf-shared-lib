class ApiError extends Error {
  constructor (args) {
    super('LF_API_ERROR')
    Error.captureStackTrace(this, ApiError)
    this.messageList = []
    this.isApiError = true
    if (args.code && args.code.indexOf('LF_') === 0) {
      this.messageList.push({
        code: args.code,
        message: args.message,
        source: args.source
      })
    }
    this.primaryCode = args.code
    this.primaryMessage = args.message
    this.primarySource = args.source
    this.details = args.details
    this.httpCode = args.httpCode || 500
  }

  addMessage (args) {
    this.messageList.push(args)
  }
}

module.exports = ApiError
