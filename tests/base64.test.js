const { base64 } = require('../index')
const examples = require('./base64-examples')

describe('Base64 w/ url decoding', () => {
  test('base64 string with dash', () => {
    let decoded = base64.encode(base64.decodeUrlSafe(examples.encodedWithDash))
    expect(decoded)
      .toEqual('Anr564EbJwC7dJr9k2aE65mg79TkyWna+Lsbboh1u0U=')
  })

  test('base64 encoded large JSON with underscore', () => {
    let decodedObj = JSON.parse(base64.decodeUrlSafe(examples.encodedWithUnderscore))
    expect(decodedObj.userId)
      .toEqual(2)
  })

  test('base64 large JSON string with underscore without url decoding', () => {
    const testFn = () => {
      let decodedObj = JSON.parse(base64.decode(examples.encodedWithUnderscore))
    }
    expect(testFn)
      .toThrow(Object.InvalidCharacterError)
  })
})

describe('Base64 w/ url encoding', () => {
  test('base64 string w/o url', () => {
    let decoded = base64.encode(base64.decodeUrlSafe(examples.encodedWithDash))
    expect(decoded)
      .toEqual('Anr564EbJwC7dJr9k2aE65mg79TkyWna+Lsbboh1u0U=')
  })

  test('base64 string w/ url', () => {
    let decoded = base64.encodeUrlSafe(base64.decodeUrlSafe(examples.encodedWithDash))
    expect(decoded)
      .toEqual('Anr564EbJwC7dJr9k2aE65mg79TkyWna-Lsbboh1u0U')
  })
})
