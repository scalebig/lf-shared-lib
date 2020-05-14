const { jwt } = require('../index')
const examples = require('./jwt-examples')

describe('jwt parsing', () => {
  test('payload extraction', () => {
    let jwtDecoded = jwt.parse(examples.fullUserToken)
    expect(jwtDecoded.payload.userId)
      .toEqual(2)
  })

  test('header extraction', () => {
    let jwtDecoded = jwt.parse(examples.fullUserToken)
    expect(jwtDecoded.header.alg)
      .toEqual('HS256')
    expect(jwtDecoded.header.typ)
      .toEqual('JWT')
  })
})
