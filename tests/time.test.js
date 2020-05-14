const { time } = require('../index')

describe('timesync wrapper', () => {
  test('now() - HP', () => {
    expect(time.now() - Date.now())
      .toBeLessThanOrEqual(50)
  })

  test('isAfterNow() - HP', () => {
    expect(time.isAfterNow(Date.now() + 100))
      .toBeTruthy()
  })
  test('isBeforeNow() - HP', () => {
    expect(time.isBeforeNow(Date.now() - 100))
      .toBeTruthy()
  })
  test('isBeforeNow() - SP', () => {
    expect(time.isBeforeNow(Date.now() + 100))
      .toBeFalsy()
  })

  test('normalizeTime() - no change', () => {
    let now = Date.now()
    expect(time.normalizeTime(now))
      .toEqual(now)
  })

  test('normalizeTime() - seconds conv', () => {
    let now = Date.now()
    expect(time.normalizeTime(now / 1000))
      .toEqual(now)
  })

  test('getMoment() - now', () => {
    expect(time.getMoment().year())
      .toEqual((new Date()).getFullYear())
  })
})
