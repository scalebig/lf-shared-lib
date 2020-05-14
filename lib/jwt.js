let base64 = require('./base64')
module.exports = {
  parse: (source) => {
    let jwtDecoded = {
      header: null,
      payload: null,
      signature: null
    }

    let parts = source.split('.')
    jwtDecoded.header = JSON.parse(base64.decodeUrlSafe(parts[0]))
    jwtDecoded.payload = JSON.parse(base64.decodeUrlSafe(parts[1]))
    jwtDecoded.signature = base64.decodeUrlSafe(parts[2])

    return jwtDecoded
  }
}
