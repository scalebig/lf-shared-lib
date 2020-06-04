const { lfNum } = require('../index')

describe('lfNum test suite', () => {
  test('HP - toFloat() same as float constructor', () => {
    expect(lfNum(3.2).toFloat())
      .toEqual(3.2)
  })

  test('HP - toFloat() same as string constructor', () => {
    expect(lfNum('3.2').toFloat())
      .toEqual(3.2)
  })

  test('HP - toFloat() same as lfNum constructor', () => {
    expect(lfNum(lfNum(3.2)).toFloat())
      .toEqual(3.2)
  })

  test('HP - toFloat() null lfNum constructor', () => {
    expect(lfNum(null).toFloat())
      .toEqual(null)
  })

  test('HP - toFloat() undefined/empty lfNum constructor returns zero', () => {
    expect(lfNum().toFloat())
      .toEqual(0)
  })

  test('HP - toFloat() NaN lfNum constructor', () => {
    var val = NaN
    expect(lfNum(val).toFloat())
      .toEqual(null)
  })

  test('HP - toFloat() non lfNum object lfNum constructor', () => {
    expect(lfNum({test: 1}).toFloat())
      .toEqual(null)
  })

  test('HP - toFloat() float lfNum constructor with min val option; less than min returns min', () => {
    expect(lfNum(-2, {min: 0}).toFloat())
      .toEqual(0)
  })

  test('HP - toFloat() float lfNum constructor with min val option; more than min returns original value', () => {
    expect(lfNum(3.14, {min: 0}).toFloat())
      .toEqual(3.14)
  })

  test('HP - toFloat() float lfNum constructor with min val option; same as min returns original value', () => {
    expect(lfNum(0, {min: 0}).toFloat())
      .toEqual(0)
  })

  test('HP - array arg should return array of lfNum instances', () => {
    expect(lfNum().addTo(lfNum([0, 1, 2, 3, 4])).toFloat())
      .toEqual(10)
  })

  test('HP - addTo; single call sums args and adds to lfNum', () => {
    expect(lfNum(3).addTo(4, 5, 6).toFloat())
      .toEqual(18)
  })

  test('HP - addTo; mutlple sequential non-chained calls sum args and adds to lfNum', () => {
    let seqAddVal = lfNum(3)
    seqAddVal.addTo(4, 5, 6)
    seqAddVal.addTo(10, 20, 30)
    expect(seqAddVal.toFloat())
      .toEqual(78)
  })

  test('HP - addTo; mutlple sequential non-chained calls sum array arg and adds to lfNum', () => {
    let seqAddVal = lfNum(3)
    seqAddVal.addTo([4, 5, 6])
    seqAddVal.addTo([10, 20, 30])
    expect(seqAddVal.toFloat())
      .toEqual(78)
  })

  test('HP - addTo; mutlple sequential chained calls sum args and adds to lfNum', () => {
    expect(lfNum(3).addTo(4, 5, 6).addTo(10, 20, 30).toFloat())
      .toEqual(78)
  })

  test('HP - addTo; mutlple sequential non-chained calls sum args and adds to lfNum; include NaN should not break summing', () => {
    let seqAddVal = lfNum(3)
    seqAddVal.addTo(4, 5, 6, NaN)
    seqAddVal.addTo(10, 20, 30)
    expect(seqAddVal.toFloat())
      .toEqual(78)
  })

  test('HP - addTo; seed with string; mutlple sequential non-chained calls sum args and adds to lfNum; include null should not break summing', () => {
    let seqAddVal = lfNum('3.14')
    seqAddVal.addTo(4, 5, 6, null)
    seqAddVal.addTo(10, 20, 30)
    expect(seqAddVal.toFloat())
      .toEqual(78.14)
  })

  test('HP - substractTo; mutlple sequential non-chained calls sum args and adds to lfNum', () => {
    let seqAddVal = lfNum(300)
    seqAddVal.subtractTo(10, 15, 25)
    seqAddVal.subtractTo(10, 20, 30)
    expect(seqAddVal.toFloat())
      .toEqual(190)
  })

  test('HP - substractTo; mutlple sequential chained calls sum args and adds to lfNum', () => {
    expect(lfNum(300).subtractTo(10, 15, 25).subtractTo(10, 20, 30).toFloat())
      .toEqual(190)
  })

  test('HP - addTo w/ substractTo; seed with string; mutlple sequential non-chained calls sum args and adds to lfNum; include null should not break summing', () => {
    let seqAddVal = lfNum('3.14')
    seqAddVal.addTo(4, 5, 6, null)
    seqAddVal.addTo(10, 20, 30)
    seqAddVal.subtractTo([5, 5])
    expect(seqAddVal.toFloat())
      .toEqual(68.14)
  })

  test('HP - addTo w/ substractTo; seed with string; mutlple sequential chained calls sum args and adds to lfNum; include null should not break summing', () => {
    expect(lfNum('3.14').addTo(4, 5, 6, null).addTo(10, 20, 30).subtractTo([5, 5]).toFloat())
      .toEqual(68.14)
  })

  test('HP - addTo w/ substractTo; seed with float; mutlple sequential non-chained calls sum args and adds to lfNum; include null should not break summing; use lfNum arg as addTo value', () => {
    let seqAddVal = lfNum('3.14')
    seqAddVal.addTo(4, 5, 6, null)
    seqAddVal.addTo(lfNum(10), lfNum(20), lfNum(30))
    seqAddVal.subtractTo([5, 5])
    expect(seqAddVal.toFloat())
      .toEqual(68.14)
  })

  test('HP - add; should return independent value from seed', () => {
    let seqAddVal = lfNum(3.14)

    expect(seqAddVal.add(10).toFloat())
      .toEqual(13.14)

    expect(seqAddVal.toFloat())
      .toEqual(3.14)
  })

  test('HP - add; should return independent value from seed; add array of values', () => {
    let seqAddVal = lfNum(3.14)

    expect(seqAddVal.add([10, 20, 30]).toFloat())
      .toEqual(63.14)

    expect(seqAddVal.toFloat())
      .toEqual(3.14)
  })

  test('HP - add; should return independent value from seed; add multiple args values', () => {
    let seqAddVal = lfNum(3.14)

    expect(seqAddVal.add(10, 20, 30).toFloat())
      .toEqual(63.14)

    expect(seqAddVal.toFloat())
      .toEqual(3.14)
  })

  test('HP - subtract; should return independent value from seed', () => {
    let seqAddVal = lfNum(100.1)

    expect(seqAddVal.subtract(10).toFloat())
      .toEqual(90.1)

    expect(seqAddVal.toFloat())
      .toEqual(100.1)
  })

  test('HP - subtract; should return independent value from seed; add array of values', () => {
    let seqAddVal = lfNum(100.1)

    expect(seqAddVal.subtract([2, 3, 5]).toFloat())
      .toEqual(90.1)

    expect(seqAddVal.toFloat())
      .toEqual(100.1)
  })

  test('HP - subtract; should return independent value from seed; add multiple args values', () => {
    let seqAddVal = lfNum(100.1)

    expect(seqAddVal.subtract(2, 3, 5).toFloat())
      .toEqual(90.1)

    expect(seqAddVal.toFloat())
      .toEqual(100.1)
  })

  test('HP - add & subtract chained', () => {
    let seqAddVal = lfNum(100.1)

    expect(seqAddVal.subtract(2, 3, 5).add(20).toFloat())
      .toEqual(110.1)

    expect(seqAddVal.toFloat())
      .toEqual(100.1)
  })

  // ***********

  test('HP - isEq() two float consts that are equal', () => {
    expect(lfNum(1.10).isEq(1.10))
      .toBeTruthy()
  })

  test('HP - isEq() two float consts (one with trailing zero) that are equal 1.10 === 1.1', () => {
    expect(lfNum(1.10).isEq(1.1))
      .toBeTruthy()
  })

  test('HP - isEq() one float const and one string const that are equal 1.10 === "1.1"', () => {
    expect(lfNum(1.10).isEq('1.1'))
      .toBeTruthy()
  })

  test('HP - isEq() one float const and one string const that are equal "1.01" === 1.01', () => {
    expect(lfNum('1.10').isEq(1.1))
      .toBeTruthy()
  })

  test('SP - isEq() two float consts that are not equal, 1.10 != 1.20', () => {
    expect(lfNum(1.10).isEq(1.20))
      .toBeFalsy()
  })

  test('SP - isEq() one float const and one string const that are not equal, 1.10 != "01.20000"', () => {
    expect(lfNum(1.10).isEq('01.20000'))
      .toBeFalsy()
  })

  // ***********

  test('HP - isNotEq() two float consts that are not equal, 1.2 !== 0.12 ', () => {
    expect(lfNum(1.2).isNotEq(0.12))
      .toBeTruthy()
  })

  test('SP - isNotEq() two float consts that are equal, 1.10 !== 1.10', () => {
    expect(lfNum(1.10).isNotEq(1.10))
      .toBeFalsy()
  })

  test('HP - isNotEq() two float consts (one iwt) that are not equal 1.10 === 1.1', () => {
    expect(lfNum(1.10).isNotEq(1.1))
      .toBeFalsy()
  })

  test('HP - isNotEq() one float const and one string const that are equal 1.10 === "1.102"', () => {
    expect(lfNum(1.10).isNotEq('1.102'))
      .toBeTruthy()
  })

  // ***********

  test('HP - isGt() one float const is greater than compared float const, 1.10 > 0.1', () => {
    expect(lfNum(1.10).isGt(0.1))
      .toBeTruthy()
  })

  test('SP - isGt() one float const is not greater than compared float const, 1.10 > 1.10', () => {
    expect(lfNum(1.10).isGt(1.10))
      .toBeFalsy()
  })

  test('HP - isGt() one float const is greater than compared null, 1.10 > null', () => {
    expect(lfNum(1.10).isGt(null))
      .toBeTruthy()
  })

  test('HP - isGte() one float const is greater than compared float const, 1.10 > 0.1', () => {
    expect(lfNum(1.10).isGte(0.1))
      .toBeTruthy()
  })

  test('HP - isGte() one float const is greater than or equal to compared float const, 1.10 == 1.10', () => {
    expect(lfNum(1.10).isGte(1.10))
      .toBeTruthy()
  })
  // ***********

  test('HP - isLt() one float const is less than compared float const, 0.1 < 1.10', () => {
    expect(lfNum(0.1).isLt(1.10))
      .toBeTruthy()
  })

  test('SP - isLt() one float const is not less than compared float const, 1.10 < 1.10', () => {
    expect(lfNum(1.10).isLt(1.10))
      .toBeFalsy()
  })

  test('HP - isLt() one float const is less than compared null, 1.10 < null', () => {
    expect(lfNum(null).isLt(1.10))
      .toBeTruthy()
  })

  test('HP - isLte() one float const is less than compared float const,  0.1 < 1.10', () => {
    expect(lfNum(0.1).isLte(1.10))
      .toBeTruthy()
  })

  test('HP - isLte() one float const is less or equal than compared float const, 1.10 == 1.10', () => {
    expect(lfNum(1.10).isLte(1.10))
      .toBeTruthy()
  })

  // *************

  test('HP - toString() display decimals when needed (nfDecimals)', () => {
    expect(lfNum('3.1400').toString())
      .toEqual('3.14')
  })

  test('HP - toString() display decimals when needed up to 2 digits (nfDecimals); longer than 2 decimal places; no trailing zeros', () => {
    expect(lfNum('3.0014').toString())
      .toEqual('3')
  })

  test('HP - toString() display decimals when needed up to 2 digits (nfDecimals); no trailing zeros', () => {
    expect(lfNum('3.00').toString())
      .toEqual('3')
  })

  test('HP - toString() display decimals when needed up to 2 digits (nfDecimals); no trailing zeros', () => {
    expect(lfNum('3.01').toString())
      .toEqual('3.01')
  })

  test('HP - decimalPlacesCount() float const with 0.0', () => {
    expect(lfNum(0.0).decimalPlacesCount())
      .toEqual(0)
  })

  test('HP - decimalPlacesCount() float const with 0.2', () => {
    expect(lfNum(0.2).decimalPlacesCount())
      .toEqual(1)
  })

  test('HP - decimalPlacesCount() string const with "0.2"', () => {
    expect(lfNum('0.2').decimalPlacesCount())
      .toEqual(1)
  })

  test('HP - decimalPlacesCount() string const with "4.00E3" should have 0 decimal places"', () => {
    expect(lfNum('4.00E3').decimalPlacesCount())
      .toEqual(0)
  })

  test('HP - decimalPlacesCount() string const with "4.0000E3" should have 1 decimal places"', () => {
    expect(lfNum('4.0000 x 10^3').decimalPlacesCount())
      .toEqual(1)
  })

  test('HP - decimalPlacesCount() string const with "4.00E-3" should have 5 decimal places"', () => {
    expect(lfNum('4.00E-3').decimalPlacesCount())
      .toEqual(5)
  })

  test('HP - decimalPlacesCount() string const with "4." should have 0 decimal places"', () => {
    expect(lfNum('4.').decimalPlacesCount())
      .toEqual(0)
  })

  test('HP - decimalPlacesCount() string const with "4." should have 1 decimal places"', () => {
    expect(lfNum('4.00E1 mL').decimalPlacesCount())
      .toEqual(1)
  })

  test('HP - isDecimalPlacesCount() string const with "0.0"', () => {
    expect(lfNum('0.0').isDecimalPlacesCount(1))
      .toEqual(true)
  })

  test('HP - isDecimalPlacesCount() float const with 0.0', () => {
    expect(lfNum(0.0).isDecimalPlacesCount(0))
      .toEqual(true)
  })

  test('HP - isDecimalPlacesCount() float const with 0.2', () => {
    expect(lfNum(0.2).isDecimalPlacesCount(1))
      .toEqual(true)
  })

  test('HP - isDecimalPlacesCount() string const with "0.2"', () => {
    expect(lfNum('0.2').isDecimalPlacesCount(1))
      .toEqual(true)
  })

  test('HP - decimalPlacesCount() string const with "0.0"', () => {
    expect(lfNum('0.0').decimalPlacesCount())
      .toEqual(1)
  })

  test('HP - sigFigCount() float const with 0.0', () => {
    expect(lfNum(0.0).isSigFigCount(0))
      .toEqual(true)
  })

  test('HP - sigFigCount() string const with "0.2g"', () => {
    expect(lfNum('0.2g').isSigFigCount(1))
      .toEqual(true)
  })

  test('HP - sigFigCount() string const with "0.0"', () => {
    expect(lfNum('0.0').isSigFigCount(0))
      .toEqual(true)
  })

  test('HP - sigFigCount() string const with "-0.50mL:"', () => {
    expect(lfNum('-0.50mL').isSigFigCount(2))
      .toEqual(true)
  })

  test('HP - sigFigCount() string const with "-0.050"', () => {
    expect(lfNum('-0.050').isSigFigCount(2))
      .toEqual(true)
  })

  test('HP - sigFigCount() string const with "0.5E2"', () => {
    expect(lfNum('0.5E2').isSigFigCount(1))
      .toEqual(true)
  })

  test('HP - sigFigCount() string const with 0.50E2', () => {
    expect(lfNum('0.50E2').isSigFigCount(2))
      .toEqual(true)
  })
  test('HP - sigFigCount() string const with 4.52 cm^2', () => {
    expect(lfNum('4.52 cm^2').isSigFigCount(3))
      .toEqual(true)
  })
  test('A value of 0 should return as 0 sig figs', () => {
    expect(lfNum('0').isSigFigCount(0))
      .toEqual(true)
  })
  test('A value of 0.0 should return as 0 sig figs', () => {
    expect(lfNum('0.0').isSigFigCount(0))
      .toEqual(true)
  })
  test('A value of 1.0 should return as 2 sig figs', () => {
    expect(lfNum('1.0').isSigFigCount(2))
      .toEqual(true)
  })
  test('A value of -010 should return as 1 sig fig', () => {
    expect(lfNum('-010').isSigFigCount(1))
      .toEqual(true)
  })
  test('A value of 0.123 should return as 3 sig figs', () => {
    expect(lfNum('0.123').isSigFigCount(3))
      .toEqual(true)
  })
  test('A value of 0.1230 should return as 4 sig figs', () => {
    expect(lfNum('0.1230').isSigFigCount(4))
      .toEqual(true)
  })
  test('A value of 10.01 should return as 4 sig figs', () => {
    expect(lfNum('10.01').isSigFigCount(4))
      .toEqual(true)
  })
  test('A value of 100.01 should return as 5 sig figs', () => {
    expect(lfNum('100.01').isSigFigCount(5))
      .toEqual(true)
  })
  test('A value of 1000.01 should return as 6 sig figs', () => {
    expect(lfNum('1000.01').isSigFigCount(6))
      .toEqual(true)
  })
  test('A value of 1230 should return as 3 sig figs', () => {
    expect(lfNum('1230').isSigFigCount(3))
      .toEqual(true)
  })
  test('A value of 1230. should return as 4 sig figs', () => {
    expect(lfNum('1230.').isSigFigCount(4))
      .toEqual(true)
  })
  test('A value of 01230. should return as 4 sig figs', () => {
    expect(lfNum('01230.').isSigFigCount(4))
      .toEqual(true)
  })
  test('A value of 0001.0 should return as 2 sig figs', () => {
    expect(lfNum('0001.0').isSigFigCount(2))
      .toEqual(true)
  })
  test('A value of 1.23E3 should return as 3 sig figs', () => {
    expect(lfNum('1.23E3').isSigFigCount(3))
      .toEqual(true)
  })
  test('A value of 1.20E3 should return as 3 sig figs', () => {
    expect(lfNum('1.20E3').isSigFigCount(3))
      .toEqual(true)
  })
  test('A value of 1.23E+3 should return as 3 sig figs', () => {
    expect(lfNum('1.23E+3').isSigFigCount(3))
      .toEqual(true)
  })
  test('A value of 1.23E-3 should return as 3 sig figs', () => {
    expect(lfNum('1.23E-3').isSigFigCount(3))
      .toEqual(true)
  })
  test('A value of 001.23E-3 should return as 3 sig figs', () => {
    expect(lfNum('001.23E-3').isSigFigCount(3))
      .toEqual(true)
  })
  test('A value of 1.2300E-3 should return as 5 sig figs', () => {
    expect(lfNum('1.2300E-3').isSigFigCount(5))
      .toEqual(true)
  })
  test('A value of 1.0023E-3 should return as 5 sig figs', () => {
    expect(lfNum('1.0023E-3').isSigFigCount(5))
      .toEqual(true)
  })
  test('A value of 1.00E-3 should return as 3 sig figs', () => {
    expect(lfNum('1.23E-3').isSigFigCount(3))
      .toEqual(true)
  })
  test('A value of 0.00123 should return unchanged', () => {
    expect(lfNum('0.00123').toSigFigCount(5) === '0.00123')
      .toEqual(true)
  })
  test('A value of 12000 should return unchanged', () => {
    expect(lfNum('12000').toSigFigCount(5) === '12000')
      .toEqual(true)
  })
  test('A value of -12000 should return unchanged', () => {
    expect(lfNum('-12000').toSigFigCount(5) === '-12000')
      .toEqual(true)
  })
  test('A value of 0.12345678 should return with 5 rounded sig figs as 0.12346', () => {
    expect(lfNum('0.12345678').toSigFigCount(5) === '0.12346')
      .toEqual(true)
  })
  test('A value of 1234567 should return with 5 rounded sig figs as 1234600', () => {
    expect(lfNum('1234567').toSigFigCount(5) === '1234600')
      .toEqual(true)
  })
  test('A value of 0.00123 should return unchanged even with round on', () => {
    expect(lfNum('0.00123').toSigFigCount(5)).toEqual('0.00123')
  })
  test('A value of 12000 should return unchanged, even with round on', () => {
    expect(lfNum('12000').toSigFigCount(5) === '12000')
      .toEqual(true)
  })
  test('A value of 100.0089898998 should return with 5 sig figs as 100.01', () => {
    expect(lfNum('100.0089898998').toSigFigCount(5) === '100.01')
      .toEqual(true)
  })
  test('A value of -12000 should return unchanged with round on', () => {
    expect(lfNum('-12000').toSigFigCount(5) === '-12000')
      .toEqual(true)
  })
  test('A value of 0.000001 should return unchanged', () => {
    expect(lfNum('0.000001').toSigFigCount(5) === '0.000001')
      .toEqual(true)
  })
  test('A value of 0.75460 should return with 2 sig figs as 0.75', () => {
    expect(lfNum('0.75460').toSigFigCount(2) === '0.75')
      .toEqual(true)
  })
  test('A string value of 2.86318e-19 should return with 4 sig figs as 2.863e-19', () => {
    expect(lfNum('2.86318e-19').toSigFigCount(4) === '2.863e-19')
      .toEqual(true)
  })
  test('A number value of 2.86318e-19 should return with 4 sig figs as 2.863e-19', () => {
    expect(lfNum(2.86318e-19).toSigFigCount(4) === '2.863e-19')
      .toEqual(true)
  })
  test('A string value of 2.86x10-19 should return with 4 sig figs as 2.86e-19', () => {
    expect(lfNum('2.86x10-19').toSigFigCount(4) === '2.86e-19')
      .toEqual(true)
  })
  test('A number value of 2.86e-19 should return with 4 sig figs as 2.86e-19', () => {
    expect(lfNum(2.86e-19).toSigFigCount(4) === '2.86e-19')
      .toEqual(true)
  })
  test('A value of 8.75460e21 should return with 2 sig figs as 8.8e+21', () => {
    expect(lfNum(8.75460e21).toSigFigCount(2) === '8.8e+21')
      .toEqual(true)
  })
  test('lfNum.mul helper function should multiply 2 * 3 and return a new lfNum containing 6 (using isEq)', () => {
    expect(lfNum.mul(2, 3).isEq(6))
      .toEqual(true)
  })
  test('lfNum.mul helper function should multiply 2 * 3 and return a new lfNum should containing 6 (using toFloat() ===)', () => {
    expect(lfNum.mul(2, 3).toFloat() === 6)
      .toEqual(true)
  })
  test('lfNum.mul helper function should multiply 0 * 3 and return a new lfNum containing 0', () => {
    expect(lfNum.mul(0, 3).isEq(0))
      .toEqual(true)
  })
  test('lfNum.mul helper function should multiply "2" * 3 and return a new lfNum containing 6(using isEq)', () => {
    expect(lfNum.mul('2.0', 3).isEq(6))
      .toEqual(true)
  })
  test('lfNum.mul helper function should multiply "2" * null and return a new lfNum containing 0 (using isEq)', () => {
    expect(lfNum.mul('2.0', null).isEq(0))
      .toEqual(true)
  })
  test('lfNum.add helper function should add 2.5 + 3 and return a new lfNum containing 5.5 (using isEq)', () => {
    expect(lfNum.add(2.5, 3).isEq(5.5))
      .toEqual(true)
  })
  test('lfNum.add helper function should add "2.5" + 3 and return a new lfNum containing 5.5 (using isEq)', () => {
    expect(lfNum.add('2.5', 3).isEq(5.5))
      .toEqual(true)
  })
  test('lfNum.add helper function should add "2.5" + null and return a new lfNum containing 2.5 (using isEq)', () => {
    expect(lfNum.add('2.5', null).isEq(2.5))
      .toEqual(true)
  })

  test('lfNum.div helper function should div 9 by 3 and return a new lfNum containing 3 (using isEq)', () => {
    expect(lfNum.div(9, 3).isEq(3))
      .toEqual(true)
  })

  test('lfNum.div helper function should div 9 by 2 and return a new lfNum containing 4.5 (using isEq)', () => {
    expect(lfNum.div(9, 2).isEq(4.5))
      .toEqual(true)
  })

  test('lfNum.div helper function should div 9 by "2" and return a new lfNum containing 4.5 (using isEq)', () => {
    expect(lfNum.div(9, '2').isEq(4.5))
      .toEqual(true)
  })

  test('lfNum.sub helper function should calc 9 - 3.5 and return a new lfNum containing 5.5 (using isEq)', () => {
    expect(lfNum.sub(9, 3.5).isEq(5.5))
      .toEqual(true)
  })

  test('lfNum.sub helper function should calc "9" - 3.5 and return a new lfNum containing 5.5 (using isEq)', () => {
    expect(lfNum.sub('9', 3.5).isEq(5.5))
      .toEqual(true)
  })

  test('lfNum.sub helper function should calc "3.5" - 9 and return a new lfNum containing -5.5 (using isEq)', () => {
    expect(lfNum.sub('3.5', 9).isEq(-5.5))
      .toEqual(true)
  })

  test('lfNum.objToFloat function will take a POJO, traverse it and replace all LfNum refs with the toFloat() val', () => {
    let obj = {
      name: 'obj name',
      score: {
        actual: lfNum(30),
        max: lfNum(60)
      },
      scoreList: [
        lfNum(1), 2, lfNum(3), 4
      ],
      id: null
    }
    lfNum.objToFloat(obj)
    expect(JSON.stringify(obj) === '{"name":"obj name","score":{"actual":30,"max":60},"scoreList":[1,2,3,4],"id":null}')
      .toEqual(true)
  })

  test('lfNum.objToLfNum function will take a POJO, traverse it and replace nodes with matching keys with the lfNum wrapper', () => {
    let obj = {
      name: 'obj name',
      score: {
        actual: 30,
        max: 60
      },
      scoreList: [
        1, 2, 3, 4
      ],
      id: null
    }
    lfNum.objToLfNum(obj, ['actual', 'max'])

    expect(obj.score.actual.isEq(30))
      .toEqual(true)

    expect(obj.score.max.isEq(60))
      .toEqual(true)
  })

  test('constructor using exponent', () => {
    expect(lfNum('1.03E3').exponent).toEqual('E3')
    expect(lfNum('1.03E3').exponentValue).toEqual('3')
  })

  test('constructor using exponent', () => {
    expect(lfNum('1.03x10^3').exponent).toEqual('E3')
    expect(lfNum('1.03x10^3').exponentValue).toEqual('3')
  })

  test('constructor using exponent', () => {
    expect(lfNum('1.03x10^-3 mL^3').exponent).toEqual('E-3')
    expect(lfNum('1.03x10^-3 mL^3').exponentValue).toEqual('-3')
  })

  test('HP - constructor using units - simple', () => {
    expect(lfNum('1 cm').num)
      .toEqual(1)

    expect(lfNum('1 cm').unit)
      .toEqual('cm')
  })

  test('HP - constructor using units - simple; leading and trailing spaces', () => {
    expect(lfNum('   1 cm   ').num)
      .toEqual(1)

    expect(lfNum('1   cm    ').unit)
      .toEqual('cm')
  })

  test('HP - constructor using units - unit with spaces;leading and trailing spaces', () => {
    expect(lfNum('   1 % of error   ').num)
      .toEqual(1)

    expect(lfNum('1   % of error    ').unit)
      .toEqual('% of error')
  })

  test('HP - constructor using units - value with commas;unit with spaces; leading and trailing spaces', () => {
    expect(lfNum('   1,000   % of error   ').num)
      .toEqual(1000)

    expect(lfNum('   1,000   % of error   ').unit)
      .toEqual('% of error')
  })

  test('HP - constructor using units - value with commas;unit with spaces; leading and trailing spaces', () => {
    expect(lfNum('   1,000,000   % of error   ').num)
      .toEqual(1000000)

    expect(lfNum('   1,000,000   % of error   ').unit)
      .toEqual('% of error')
  })

  test('HP - constructor using units - value with negative+decimals; unit with spaces; leading and trailing spaces', () => {
    expect(lfNum('   -1.0012   % of error   ').num)
      .toEqual(-1.0012)

    expect(lfNum('   -1.0012   % of error   ').unit)
      .toEqual('% of error')
  })

  test('HP - constructor using units - value with negative+decimals', () => {
    expect(lfNum('-1.0012 cm').num)
      .toEqual(-1.0012)

    expect(lfNum('   -1.0012 cm').unit)
      .toEqual('cm')
  })

  test('HP - constructor using units - value with negative+decimal; units with no prefix space', () => {
    expect(lfNum('-1.0012cm').num)
      .toEqual(-1.0012)

    expect(lfNum('   -1.0012cm').unit)
      .toEqual('cm')
  })

  test('HP - constructor using units - value with negative+SN(no space after decimal + small exp + upper case E); simple unit', () => {
    expect(lfNum('-1.001E01 cm').num)
      .toEqual(-10.01)

    expect(lfNum('-1.001E01 cm').unit)
      .toEqual('cm')
  })

  test('HP - constructor using units - value with negative+SN(no space after decimal + large exp + upper case E); simple unit', () => {
    expect(lfNum('-1.001E32 cm').num)
      .toEqual(-1.001e+32)

    expect(lfNum('-1.001E32 cm').unit)
      .toEqual('cm')
  })

  test('HP - constructor using units - value with positive+SN(no space after decimal + large exp + upper case E); simple unit', () => {
    expect(lfNum('+1.201E32 cm').num)
      .toEqual(+1.201e+32)

    expect(lfNum('+1.201E32 cm').unit)
      .toEqual('cm')
  })

  test('HP - constructor using units - value with positive+SN(no space after decimal + large exp + lower case E); simple unit', () => {
    expect(lfNum('+1.201e32 cm').num)
      .toEqual(+1.201e+32)

    expect(lfNum('+1.201e32 cm').unit)
      .toEqual('cm')
  })

  test('HP - constructor using units - value with positive+SN(no space after decimal + large exp + lower case E + prefix plus); simple unit', () => {
    expect(lfNum('+1.201e+32 cm').num)
      .toEqual(+1.201e+32)

    expect(lfNum('+1.201e+32 cm').unit)
      .toEqual('cm')
  })

  test('HP - constructor using units - value with positive+SN(no space after decimal + large neg exp + lower case E + prefix plus); simple unit', () => {
    expect(lfNum('+1.201e-32 cm').num)
      .toEqual(+1.201e-32)

    expect(lfNum('+1.201e-32 cm').unit)
      .toEqual('cm')
  })

  test('HP - constructor using units - value with positive+SN(no space after decimal + large neg exp + lower case E + prefix plus); simple unit', () => {
    expect(lfNum('+1.201e-32 cm').num)
      .toEqual(+1.201e-32)

    expect(lfNum('+1.201e-32 cm').unit)
      .toEqual('cm')
  })

  test('HP - constructor using units - value with positive+SN(no space after decimal + large neg exp + [x10^-20 notation] + prefix plus); simple unit', () => {
    expect(lfNum('+1.201x10^-20 cm').num)
      .toEqual(+1.201e-20)

    expect(lfNum('+1.201e-20 cm').unit)
      .toEqual('cm')
  })

  test('HP - constructor using units - value with positive+SN(no space after decimal + large neg exp + [* 10 ^  notation] + prefix plus); simple unit', () => {
    expect(lfNum('-1.201 * 10 ^ -20 cm^3').num)
      .toEqual(-1.201e-20)

    expect(lfNum('-1.201 * 10 ^ -20 cm^3').unit)
      .toEqual('cm^3')
  })

  test('HP - constructor with currency prefix', () => {
    expect(lfNum('$1').num)
      .toEqual(1)

    expect(lfNum('$1').currency)
      .toEqual('$')
  })

  test('HP - constructor with currency prefix; commas; decimals', () => {
    expect(lfNum('$1,000,000.002').num)
      .toEqual(1000000.002)

    expect(lfNum('$1,000,000.002').currency)
      .toEqual('$')
  })

  test('HP - constructor with currency prefix; commas; decimal; negative sign', () => {
    expect(lfNum('-$1,000,000.002').num)
      .toEqual(-1000000.002)

    expect(lfNum('-$1,000,000.002').currency)
      .toEqual('$')

    expect(lfNum('-$1,000,000.002').sign)
      .toEqual('-')
  })

  test('HP - constructor with currency prefix; commas; decimal; positive sign', () => {
    expect(lfNum('+$1,000,000.002').num)
      .toEqual(1000000.002)

    expect(lfNum('+$1,000,000.002').currency)
      .toEqual('$')

    expect(lfNum('+$1,000,000.002').sign)
      .toEqual('+')
  })

  test('HP - constructor returns a rawNum of null when passed a stringified object or array', () => {
    expect(lfNum(JSON.stringify([{insert: 'text'}])).num)
      .toEqual(null)

    expect(lfNum(JSON.stringify({insert: 'text'})).num)
      .toEqual(null)
  })

  test('HP - isInTolerance; tolerance 0.1; expected: 100; entered 100 ', () => {
    expect(lfNum(100).isInTolerance(100, 0.1))
      .toEqual(true)
  })

  test('HP - isInTolerance; tolerance 0.1; expected: 100; entered 90 ', () => {
    expect(lfNum(90).isInTolerance(100, 0.1))
      .toEqual(true)
  })

  test('HP - isInTolerance; tolerance 0.1; expected: 100; entered 110 ', () => {
    expect(lfNum(110).isInTolerance(100, 0.1))
      .toEqual(true)
  })

  test('SP - isInTolerance; tolerance 0.1; expected: 100; entered 111 ', () => {
    expect(lfNum(111).isInTolerance(100, 0.1))
      .toEqual(false)
  })

  test('SP - isInTolerance; tolerance 0.1; expected: 100; entered 89 ', () => {
    expect(lfNum(89).isInTolerance(100, 0.1))
      .toEqual(false)
  })

  test('HP - isInTolerance; tolerance 0.1; expected: -100; entered -110 ', () => {
    expect(lfNum(-110).isInTolerance(-100, 0.1))
      .toEqual(true)
  })

  test('HP - isInTolerance; tolerance 0; expected: 100; entered 100 ', () => {
    expect(lfNum(100).isInTolerance(100, 0))
      .toEqual(true)
  })

  test('HP - isInTolerance; tolerance null; expected: 100; entered 100 ', () => {
    expect(lfNum(100).isInTolerance(100, null))
      .toEqual(true)
  })
  test('HP - isInTolerance; tolerance 0; expected: -100; entered -100 ', () => {
    expect(lfNum(-100).isInTolerance(-100, null))
      .toEqual(true)
  })
  test('HP - isInTolerance; tolerance 0; expected: -100; entered 100 ', () => {
    expect(lfNum(100).isInTolerance(-100, 0))
      .toEqual(false)
  })

  test('HP - isInTolerance; tolerance 0.1; expected: 100; entered 1; multiplier: .01; type is relative (not absolute) ', () => {
    expect(lfNum(1).isInTolerance(100, 0.1, 0.01))
      .toEqual(true)
  })

  test('HP - isInTolerance; tolerance 0.1; expected: 1; entered 110; multiplier: 100; type is relative (not absolute) ', () => {
    expect(lfNum(110).isInTolerance(1, 0.1, 100))
      .toEqual(true)
  })

  test('HP - isInTolerance; tolerance 0.1; expected: 10; entered 10; multiplier: 1; type is absolute ', () => {
    expect(lfNum(10).isInTolerance(10, 0.5, 1, true))
      .toEqual(true)
  })

  test('HP - isInTolerance; tolerance 0.5; expected: 10; entered 10.4; multiplier: 1; type is absolute ', () => {
    expect(lfNum(10.4).isInTolerance(10, 0.5, 1, true))
      .toEqual(true)
  })

  test('HP - isInTolerance; tolerance 0.5; expected: 10; entered 10.6; multiplier: 1; type is absolute ', () => {
    expect(lfNum(10.6).isInTolerance(10, 0.5, 1, true))
      .toEqual(false)
  })

  test('HP - isInTolerance; tolerance 0.5; expected: -10; entered -10.6; multiplier: 1; type is absolute ', () => {
    expect(lfNum(-10.5).isInTolerance(-10, 0.5, 1, true))
      .toEqual(true)
  })
  test('HP - isInTolerance; tolerance 0.5; expected: -10; entered -10.6; multiplier: 1; type is absolute ', () => {
    expect(lfNum(-10.6).isInTolerance(-10, 0.5, 1, true))
      .toEqual(false)
  })
  test('HP - isInToleranceRange; expected: 10; entered 10.6; lowerMultiplier: 0.95; upperMultiplier: 1.05', () => {
    expect(lfNum(10.6).isInToleranceRange(10, 0.95, 1.05))
      .toEqual(false)
  })
  test('HP - isInToleranceRange; expected: 10; entered 10.6; lowerMultiplier: 0.95; upperMultiplier: 1.05', () => {
    expect(lfNum(10.3).isInToleranceRange(10, 0.95, 1.05))
      .toEqual(true)
  })
  test('HP - isInToleranceRange; expected: -10; entered -10.6; lowerMultiplier: 0.95; upperMultiplier: 1.05', () => {
    expect(lfNum(-10.6).isInToleranceRange(-10, 0.95, 1.05))
      .toEqual(false)
  })
  test('HP - isInToleranceRange; expected: -10; entered -10.3; lowerMultiplier: 0.95; upperMultiplier: 1.05', () => {
    expect(lfNum(-10.3).isInToleranceRange(-10, 0.95, 1.05))
      .toEqual(true)
  })
  test('HP - isInToleranceRange; expected: 0; entered 0; lowerMultiplier: 0.95; upperMultiplier: 1.05', () => {
    expect(lfNum(0).isInToleranceRange(0, 0.95, 1.05))
      .toEqual(true)
  })
  test('HP - isInToleranceRange; expected: 0; entered 0.25; lowerMultiplier: 0.95; upperMultiplier: 1.05', () => {
    expect(lfNum(0.25).isInToleranceRange(0, 0.95, 1.05))
      .toEqual(false)
  })
  test('HP - isInToleranceRange; expected: 0; entered -0.25; lowerMultiplier: 0.95; upperMultiplier: 1.05', () => {
    expect(lfNum(-0.25).isInToleranceRange(0, 0.95, 1.05))
      .toEqual(false)
  })
  test('HP - isInToleranceRange; expected: 5; entered 5; lowerMultiplier: 1; upperMultiplier: 1.5', () => {
    expect(lfNum(5).isInToleranceRange(5, 1, 1.1))
      .toEqual(true)
  })
  test('HP - isInToleranceRange; expected: 5; entered 5; lowerMultiplier: 0.9; upperMultiplier: 1', () => {
    expect(lfNum(5).isInToleranceRange(5, 0.9, 1))
      .toEqual(true)
  })
  test('HP - isInToleranceRange; expected: 1.543; entered 1.5; lowerMultiplier: 0.98; upperMultiplier: 1.02; sigfigs: 2; decimal:', () => {
    expect(lfNum(1.5).isInToleranceRange(1.543, 0.98, 1.02, 2, ''))
      .toEqual(true)
  })
  test('HP - isInToleranceRange; expected: 1.543; entered 1.6; lowerMultiplier: 0.98; upperMultiplier: 1.02; sigfigs: 2; decimal:', () => {
    expect(lfNum(1.6).isInToleranceRange(1.543, 0.98, 1.02, 2, ''))
      .toEqual(true)
  })
  test('HP - isInToleranceRange; expected: 1.543; entered 1.7; lowerMultiplier: 0.98; upperMultiplier: 1.02; sigfigs: 2; decimal:', () => {
    expect(lfNum(1.7).isInToleranceRange(1.543, 0.98, 1.02, '2', ''))
      .toEqual(false)
  })
  test('HP - isInToleranceRange; expected: 1.543; entered 1.5; lowerMultiplier: 0.98; upperMultiplier: 1.02; sigfigs: ; decimal:1', () => {
    expect(lfNum(1.5).isInToleranceRange(1.543, 0.98, 1.02, 2, ''))
      .toEqual(true)
  })
  test('HP - isInToleranceRange; expected: 1.543; entered 1.6; lowerMultiplier: 0.98; upperMultiplier: 1.02; sigfigs: ; decimal:1', () => {
    expect(lfNum(1.6).isInToleranceRange(1.543, 0.98, 1.02, '', 1))
      .toEqual(true)
  })
  test('HP - isInToleranceRange; expected: 1.543; entered 1.4; lowerMultiplier: 0.98; upperMultiplier: 1.02; sigfigs: ; decimal:1', () => {
    expect(lfNum(1.4).isInToleranceRange(1.543, 0.98, 1.02, '', 1))
      .toEqual(false)
  })
  test('HP - isInToleranceRange; expected: 1.543E-5; entered 1.5E-5; lowerMultiplier: 0.98; upperMultiplier: 1.02; sigfigs: 2; decimal:', () => {
    expect(lfNum(1.5E-5).isInToleranceRange(1.543E-5, 0.98, 1.02, 2, ''))
      .toEqual(true)
  })
  test('HP - isInToleranceRange; expected: 1.543E-5; entered 1.6E-5; lowerMultiplier: 0.98; upperMultiplier: 1.02; sigfigs: ; decimal:1', () => {
    expect(lfNum(1.6E-5).isInToleranceRange(1.543E-5, 0.98, 1.02, '', 1))
      .toEqual(false)
  })
  test('HP - isInToleranceRange; expected: 1.543E-5; entered 1.6E-5; lowerMultiplier: 0.98; upperMultiplier: 1.02; sigfigs: ; decimal:6', () => {
    expect(lfNum(1.6E-5).isInToleranceRange(1.543E-5, 0.98, 1.02, '', '6'))
      .toEqual(true)
  })
  test('HP - isInToleranceRange; expected: 234; entered 0xEA; lowerMultiplier: 0.98; upperMultiplier: 1.02; sigfigs: ; decimal:', () => {
    expect(lfNum(0xEA).isInToleranceRange(234, 0.98, 1.02, '', ''))
      .toEqual(true)
  })

  test('A value of 1234 should be rounded to 123', () => {
    expect(lfNum('1234').roundLastDigit()).toEqual('123')
  })

  test('A value of 1236 should be rounded to 124', () => {
    expect(lfNum('1236').roundLastDigit()).toEqual('124')
  })

  test('A value of 1.234 should be rounded to 1.23', () => {
    expect(lfNum('1.234').roundLastDigit()).toEqual('1.23')
  })

  test('A value of 1.236 should be rounded to 1.24', () => {
    expect(lfNum('1.236').roundLastDigit()).toEqual('1.24')
  })

  test('A value of 12.34 should be rounded to 12.3', () => {
    expect(lfNum('12.34').roundLastDigit()).toEqual('12.3')
  })

  test('A value of 12.36 should be rounded to 12.4', () => {
    expect(lfNum('12.36').roundLastDigit()).toEqual('12.4')
  })

  test('A value of 123.4 should be rounded to 123.', () => {
    expect(lfNum('1234.').roundLastDigit()).toEqual('1234')
  })

  test('A value of 123.6 should be rounded to 124.', () => {
    expect(lfNum('123.6').roundLastDigit()).toEqual('124.')
  })

  test('A value of 1234. should be rounded to 1234', () => {
    expect(lfNum('1234.').roundLastDigit()).toEqual('1234')
  })

  test('A value of 1236. should be rounded to 1236', () => {
    expect(lfNum('1236.').roundLastDigit()).toEqual('1236')
  })

  test('A value of 12 should be rounded to 1', () => {
    expect(lfNum('12').roundLastDigit()).toEqual('1')
  })

  test('A value of 16 should be rounded to 2', () => {
    expect(lfNum('16').roundLastDigit()).toEqual('2')
  })

  test('A value of 5 should be rounded to the empty string', () => {
    expect(lfNum('5').roundLastDigit()).toEqual('')
  })

  test('A value of 4 should be rounded to the empty string', () => {
    expect(lfNum('4').roundLastDigit()).toEqual('')
  })

  test('A value of 1.2 should be rounded to 1.', () => {
    expect(lfNum('1.2').roundLastDigit()).toEqual('1.')
  })

  test('A value of 1.6 should be rounded to 2.', () => {
    expect(lfNum('1.6').roundLastDigit()).toEqual('2.')
  })

  test('A value of .12 should be rounded to .1', () => {
    expect(lfNum('.12').roundLastDigit()).toEqual('.1')
  })

  test('A value of .16 should be rounded to .2', () => {
    expect(lfNum('.16').roundLastDigit()).toEqual('.2')
  })

  test('A value of 0.016 should be rounded to 0.02', () => {
    expect(lfNum('0.016').roundLastDigit()).toEqual('0.02')
  })

  test('A value of 0.0 should be rounded to 0.', () => {
    expect(lfNum('0.0').roundLastDigit()).toEqual('0.')
  })

  test('Rounding an lfNum should have a default toString with the number of decimal places rounded to', () => {
    expect(lfNum('1.00').toString()).toEqual('1')
    expect(lfNum('1.001').round(2).toString()).toEqual('1.00')
    expect(lfNum('1.009').round(2).toString()).toEqual('1.01')
    const test = lfNum('1.001').round(2)
    expect(`value: ${test}`).toEqual('value: 1.00')
  })

  test('A string with em dashes should be normalized to a string with hyphens', () => {
    let longDashUnit = 'M—1cm—1'
    let hyphenUnit = 'M-1cm-1'
    expect(longDashUnit).not.toEqual(hyphenUnit)
    expect(lfNum.normalizeUnit(longDashUnit)).toEqual(hyphenUnit)
  })

  test('Same as above using the unit stored in lfNum', () => {
    let entry = '-1.23e-24 M—1cm—1'
    let hyphenUnit = 'M-1cm-1'
    expect(lfNum(entry).unit).not.toEqual(hyphenUnit)
    expect(lfNum(entry).getNormalizedUnit()).toEqual(hyphenUnit)
  })

  test('A string with all types of dashes should be normalized to a string with hyphens', () => {
    let longDashUnit = '-short-mid–long—'
    let hyphenUnit = '-short-mid-long-'
    expect(longDashUnit).not.toEqual(hyphenUnit)
    expect(lfNum.normalizeUnit(longDashUnit)).toEqual(hyphenUnit)
  })

  test('Same as above using the unit stored in lfNum', () => {
    let entry = '-1.23e-24 -short-mid–long—'
    let hyphenUnit = '-short-mid-long-'
    expect(lfNum(entry).unit).not.toEqual(hyphenUnit)
    expect(lfNum(entry).getNormalizedUnit()).toEqual(hyphenUnit)
  })

})
