let self = module.exports = {
  decode: (source) => {
    if (!source) return source

    if (window) {
      return window.atob(source)
    } else {
      // insert node specific version here
    }
  },
  decodeUrlSafe: (source) => {
    if (!source) return source

    return self.decode(source.replace(/\-/g, '+').replace(/_/g, '/'))
  },
  encode: (source) => {
    if (!source) return source

    if (window) {
      return window.btoa(source)
    } else {
      // insert node specific version here
    }
  },
  encodeUrlSafe: (source) => {
    if (!source) return source

    let encoded = self.encode(source)
    return encoded.replace(/\//g, '_')
      .replace(/\+/g, '-')
      .replace(/=+$/, '')
  }
}
