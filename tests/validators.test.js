const { validators } = require('../index')

// significant figure count is tested in lfMath.test.js
// still needs tests for email

// ==============
// REQUIRED
// ==============
describe('Given a value, required should return false if the input is empty, true in all other cases', () => {
  const fields = {
    a: null,
    b: '',
    c: '$$$',
    d: '0',
    e: 10,
    f: 'labflow',
    g: -10,
    h: 'false'
  }
  test('A value of null should return false', () => {
    expect(validators.required(fields, 'a'))
      .toEqual(false)
  })
  test('A value of "" should return false', () => {
    expect(validators.required(fields, 'b'))
      .toEqual(false)
  })
  test('A value of "$$$" should return true', () => {
    expect(validators.required(fields, 'c'))
      .toEqual(true)
  })
  test('A value of "0" should return true', () => {
    expect(validators.required(fields, 'd'))
      .toEqual(true)
  })
  test('A value of 10 should return true', () => {
    expect(validators.required(fields, 'e'))
      .toEqual(true)
  })
  test('A value of "labflow" should return true', () => {
    expect(validators.required(fields, 'f'))
      .toEqual(true)
  })
  test('A value of -10 should return true', () => {
    expect(validators.required(fields, 'g'))
      .toEqual(true)
  })
  test('A value of "false" should return true', () => {
    expect(validators.required(fields, 'h'))
      .toEqual(true)
  })
})
// ==============
// NUMERIC
// ==============
describe('Given a value, numeric should return whether it is numeric', () => {
  const fields = {
    a: '1.2',
    b: '0',
    c: '-7.355',
    d: '+3',
    e: '10.3e17',
    f: '10e17b',
    g: '-1.23e-2',
    h: 'labflow',
    i: '-.2e+4',
    j: '75.e2',
    k: '63.3.87',
    l: '1.2e',
    m: 'e',
    n: 'e2',
    o: '.300'
  }
  test('A value of 1.2 should return true', () => {
    expect(validators.numeric(fields, 'a'))
      .toEqual(true)
  })
  test('A value of 0 should return true', () => {
    expect(validators.numeric(fields, 'b'))
      .toEqual(true)
  })
  test('A value of -7.355 should return true', () => {
    expect(validators.numeric(fields, 'c'))
      .toEqual(true)
  })
  test('A value of +3 should return true', () => {
    expect(validators.numeric(fields, 'd'))
      .toEqual(true)
  })
  test('A value of 10e17 should return true', () => {
    expect(validators.numeric(fields, 'e'))
      .toEqual(true)
  })
  test('A value of 10e17b should return false', () => {
    expect(validators.numeric(fields, 'f'))
      .toEqual(false)
  })
  test('A value of -1.23e-2 should return true', () => {
    expect(validators.numeric(fields, 'g'))
      .toEqual(true)
  })
  test('A value of labflow should return false', () => {
    expect(validators.numeric(fields, 'h'))
      .toEqual(false)
  })
  test('A value of -.2e+4 should return true', () => {
    expect(validators.numeric(fields, 'i'))
      .toEqual(true)
  })
  test('A value of 75.e2 should return true', () => {
    expect(validators.numeric(fields, 'j'))
      .toEqual(true)
  })
  test('A value of 63.3.87 should return false', () => {
    expect(validators.numeric(fields, 'k'))
      .toEqual(false)
  })
  test('A value of 1.2e should return false', () => {
    expect(validators.numeric(fields, 'l'))
      .toEqual(false)
  })
  test('A value of e should return false', () => {
    expect(validators.numeric(fields, 'm'))
      .toEqual(false)
  })
  test('A value of e2 should return false', () => {
    expect(validators.numeric(fields, 'n'))
      .toEqual(false)
  })
  test('A value of .300 should return true', () => {
    expect(validators.numeric(fields, 'o'))
      .toEqual(true)
  })
})
// ==============
// MINLENGTH
// ==============
describe('Given a value and a required length, minLength should return whether the value satisfies the requirement', () => {
  const fields = {
    a: '0',
    b: '123',
    c: '512-524-6956',
    d: 'labflow'
  }
  test('A value of 0 with a requirement of 0 should return true', () => {
    expect(validators.minLength(fields, 'a', 0))
      .toEqual(true)
  })
  test('A value of 0 with a requirement of 1 should return true', () => {
    expect(validators.minLength(fields, 'a', 1))
      .toEqual(true)
  })
  test('A value of 0 with a requirement of 2 should return false', () => {
    expect(validators.minLength(fields, 'a', 2))
      .toEqual(false)
  })
  test('A value of 123 with a requirement of 2 should return true', () => {
    expect(validators.minLength(fields, 'b', 2))
      .toEqual(true)
  })
  test('A value of 123 with a requirement of 3 should return true', () => {
    expect(validators.minLength(fields, 'b', 3))
      .toEqual(true)
  })
  test('A value of 123 with a requirement of 10 should return false', () => {
    expect(validators.minLength(fields, 'b', 10))
      .toEqual(false)
  })
  test('A value of 512-524-6956 with a requirement of 11 should return true', () => {
    expect(validators.minLength(fields, 'c', 11))
      .toEqual(true)
  })
  test('A value of 512-524-6956 with a requirement of 13 should return false', () => {
    expect(validators.minLength(fields, 'c', 13))
      .toEqual(false)
  })
  test('A value of labflow with a requirement of 5 should return true', () => {
    expect(validators.minLength(fields, 'd', 5))
      .toEqual(true)
  })
  test('A value of labflow with a requirement of 7 should return true', () => {
    expect(validators.minLength(fields, 'd', 7))
      .toEqual(true)
  })
  test('A value of labflow with a requirement of 8 should return false', () => {
    expect(validators.minLength(fields, 'd', 8))
      .toEqual(false)
  })
})

// ==============
// EXCLUSIVEBOUNDS
// INCLUSIVEBOUNDS
// ==============
describe('Given a value and an upper and lower bound, exclusiveBounds/inclusiveBounds should return whether the value falls between the bounds', () => {
  const fields = {
    a: '0',
    b: '1.1',
    c: '-2.03',
    d: '3.01E3',
    e: '-1.23E-3'
  }
  // exclusiveBounds
  test('A value of 0 with bounds of -1 and 1 should return true', () => {
    expect(validators.exclusiveBounds(fields, 'a', -1, 1))
      .toEqual(true)
  })
  test('A value of 0 with bounds of -1234.56 and 1234.56 should return true', () => {
    expect(validators.exclusiveBounds(fields, 'a', -1234.56, 1234.56))
      .toEqual(true)
  })
  test('A value of 0 with bounds of 0 and 1 should return false', () => {
    expect(validators.exclusiveBounds(fields, 'a', 0, 1))
      .toEqual(false)
  })
  test('A value of 0 with bounds of -1 and 0 should return false', () => {
    expect(validators.exclusiveBounds(fields, 'a', -1, 0))
      .toEqual(false)
  })
  test('A value of 0 with bounds of 1 and 1000 should return false', () => {
    expect(validators.exclusiveBounds(fields, 'a', 1, 1000))
      .toEqual(false)
  })
  test('A value of 1.1 with bounds of 1 and 10 should return true', () => {
    expect(validators.exclusiveBounds(fields, 'b', 1, 10))
      .toEqual(true)
  })
  test('A value of 1.1 with bounds of 1.1 and 10 should return false', () => {
    expect(validators.exclusiveBounds(fields, 'b', 1.1, 10))
      .toEqual(false)
  })
  test('A value of 1.1 with bounds of 1.099 and 1.101 should return true', () => {
    expect(validators.exclusiveBounds(fields, 'b', 1.099, 1.101))
      .toEqual(true)
  })
  test('A value of 1.1 with bounds of 1.099 and 1.101 should return true', () => {
    expect(validators.exclusiveBounds(fields, 'b', 1.099, 1.101))
      .toEqual(true)
  })
  test('A value of -2.03 with bounds of 1 and 3 should return false', () => {
    expect(validators.exclusiveBounds(fields, 'c', 1, 3))
      .toEqual(false)
  })
  test('A value of -2.03 with bounds of -3 and -1 should return true', () => {
    expect(validators.exclusiveBounds(fields, 'c', -3, -1))
      .toEqual(true)
  })
  test('A value of -2.03 with bounds of -3 and -2.03 should return false', () => {
    expect(validators.exclusiveBounds(fields, 'c', -3, -2.03))
      .toEqual(false)
  })
  test('A value of 3.01E3 with bounds of 3E3 and 3.2E3 should return true', () => {
    expect(validators.exclusiveBounds(fields, 'd', 3E3, 3.2E3))
      .toEqual(true)
  })
  test('A value of 3.01E3 with bounds of 3009 and 3010.0 should return false', () => {
    expect(validators.exclusiveBounds(fields, 'd', 3009, 3010.0))
      .toEqual(false)
  })
  test('A value of -1.23E-3 with bounds of -0.001 and -0.002 should return true', () => {
    expect(validators.exclusiveBounds(fields, 'e', -0.002, -0.001))
      .toEqual(true)
  })
  test('A value of -1.23E-3 with bounds of -0.00123 and 0 should return false', () => {
    expect(validators.exclusiveBounds(fields, 'e', -0.00123, 0))
      .toEqual(false)
  })
  // inclusiveBounds
  test('A value of 0 with bounds of -1 and 1 should return true', () => {
    expect(validators.inclusiveBounds(fields, 'a', -1, 1))
      .toEqual(true)
  })
  test('A value of 0 with bounds of -1234.56 and 1234.56 should return true', () => {
    expect(validators.inclusiveBounds(fields, 'a', -1234.56, 1234.56))
      .toEqual(true)
  })
  test('A value of 0 with bounds of 0 and 1 should return true', () => {
    expect(validators.inclusiveBounds(fields, 'a', 0, 1))
      .toEqual(true)
  })
  test('A value of 0 with bounds of -1 and 0 should return true', () => {
    expect(validators.inclusiveBounds(fields, 'a', -1, 0))
      .toEqual(true)
  })
  test('A value of 0 with bounds of 1 and 1000 should return false', () => {
    expect(validators.inclusiveBounds(fields, 'a', 1, 1000))
      .toEqual(false)
  })
  test('A value of 1.1 with bounds of 1 and 10 should return true', () => {
    expect(validators.inclusiveBounds(fields, 'b', 1, 10))
      .toEqual(true)
  })
  test('A value of 1.1 with bounds of 1.1 and 10 should return true', () => {
    expect(validators.inclusiveBounds(fields, 'b', 1.1, 10))
      .toEqual(true)
  })
  test('A value of 1.1 with bounds of 1.099 and 1.101 should return true', () => {
    expect(validators.inclusiveBounds(fields, 'b', 1.099, 1.101))
      .toEqual(true)
  })
  test('A value of 1.1 with bounds of 1.099 and 1.101 should return true', () => {
    expect(validators.inclusiveBounds(fields, 'b', 1.099, 1.101))
      .toEqual(true)
  })
  test('A value of -2.03 with bounds of 1 and 3 should return false', () => {
    expect(validators.inclusiveBounds(fields, 'c', 1, 3))
      .toEqual(false)
  })
  test('A value of -2.03 with bounds of -3 and -1 should return true', () => {
    expect(validators.inclusiveBounds(fields, 'c', -3, -1))
      .toEqual(true)
  })
  test('A value of -2.03 with bounds of -3 and -2.03 should return true', () => {
    expect(validators.inclusiveBounds(fields, 'c', -3, -2.03))
      .toEqual(true)
  })
  test('A value of 3.01E3 with bounds of 3E3 and 3.2E3 should return true', () => {
    expect(validators.inclusiveBounds(fields, 'd', 3E3, 3.2E3))
      .toEqual(true)
  })
  test('A value of 3.01E3 with bounds of 3009 and 3010.0 should return true', () => {
    expect(validators.inclusiveBounds(fields, 'd', 3009, 3010.0))
      .toEqual(true)
  })
  test('A value of -1.23E-3 with bounds of -0.001 and -0.002 should return true', () => {
    expect(validators.inclusiveBounds(fields, 'e', -0.002, -0.001))
      .toEqual(true)
  })
  test('A value of -1.23E-3 with bounds of -0.00123 and 0 should return true', () => {
    expect(validators.inclusiveBounds(fields, 'e', -0.00123, 0))
      .toEqual(true)
  })
})
