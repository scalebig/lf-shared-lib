const moment = require('moment-timezone')
const _ = require('./strings')('globals.dateTime')
const numeral = require('numeral')

// formatters still has references to time functions for backwards compatibility
// these will be removed over time

const time = require('./time')

let self = module.exports = {
  browserTimeZone: time.browserTimeZone,
  timeZone: time.timeZone,
  getDuration: time.getDuration,
  setTimeZone: time.setTimeZone,
  getMoment: time.getMoment,
  getTzMoment: time.getTzMoment,
  getUtcTimestamp: time.getUtcTimestamp,
  getTimeFromSeconds: time.getTimeFromSeconds,
  secondsToMiliseconds: time.normalizeTime,
  checkValidDate: time.checkValidDate,

  dateTime: {
    short: {
      dayOfWeek: (dateSource) => (_[moment(dateSource).tz(time.timeZone).format('ddd').toLowerCase()]),
      dateOnly: (dateSource) => (moment(dateSource).tz(time.timeZone).format('MM/DD/YYYY')),
      timeOnly: (dateSource) => (moment(dateSource).tz(time.timeZone).format('h:mmA[(' + moment(dateSource).tz(time.timeZone).format('z') + ')]')),
      dateTime: (dateSource) => (moment(dateSource).tz(time.timeZone).format('MM/DD/YYYY h:mmA[(' + moment(dateSource).tz(time.timeZone).format('z') + ')]'))
    },
    long: {
      dayOfWeek: (dateSource) => (_[moment(dateSource).tz(time.timeZone).format('dddd').toLowerCase()]),
      dateOnly: (dateSource) => (moment(dateSource).tz(time.timeZone).format('MM/DD/YYYY')),
      timeOnly: (dateSource) => (moment(dateSource).tz(time.timeZone).format('h:mmA[(' + moment(dateSource).tz(time.timeZone).format('z') + ')]')),
      dateTime: (dateSource) => (moment(dateSource).tz(time.timeZone).format('MM/DD/YYYY h:mmA[(' + moment(dateSource).tz(time.timeZone).format('z') + ')]')),
      dateTimeLocal: (dateSource) => (moment(dateSource).tz(time.timeZone).format('YYYY-MM-DDTHH:mm')),
      weekDayAndTime: (dateSource) => (moment(dateSource).format('dddd, h:mm a'))
    }
  },

  getDay: (dayNumber) => {
    if (dayNumber) {
      switch (dayNumber) {
        case 7:
          return 'Sun'
        case 1:
          return 'Mon'
        case 2:
          return 'Tue'
        case 3:
          return 'Wed'
        case 4:
          return 'Thu'
        case 5:
          return 'Fri'
        case 6:
          return 'Sat'
      }
    }
  },
  getDayLong: (dayNumber) => {
    if (dayNumber) {
      switch (dayNumber) {
        case 7:
          return 'Sunday'
        case 1:
          return 'Monday'
        case 2:
          return 'Tueday'
        case 3:
          return 'Wednesday'
        case 4:
          return 'Thursday'
        case 5:
          return 'Friday'
        case 6:
          return 'Saturday'
      }
    }
  },
  getDayNumberFromString: (dayString) => {
    if (dayString) {
      switch (dayString) {
        case 'Sun' || 'Sunday':
          return 7
        case 'Mon' || 'Monday':
          return 1
        case 'Tue' || 'Tuesday':
          return 2
        case 'Wed' || 'Wednesday':
          return 3
        case 'Thu' || 'Thursday':
          return 4
        case 'Fri' || 'Friday':
          return 5
        case 'Sat' || 'Saturday':
          return 6
      }
    }
  },

  formatNumber: (number, options = {}) => {
    let decimalsFn = number => {
      let ret = number ? numeral(number).format('0.00') : '-'
      if (number === 0 && options.noZeroDash) {
        ret = numeral(number).format('0.00')
      }
      return ret
    }
    let nonFixedDecimalsFn = number => {
      let ret = number ? numeral(number).format('0.[00]') : '-'
      if (number === 0 && options.noZeroDash) {
        ret = numeral(number).format('0.[00]')
      }
      return ret
    }
    let dynDecimalsFn = (number, count) => {
      let ret = number
      if (count > 0) {
        ret = numeral(number).format('0.' + '0'.repeat(count))
      } else {
        ret = numeral(number).format('0')
      }
      return ret
    }

    return {
      twoDigits: numeral(number).format('00'),
      currency: numeral(number).format('$0.00'),
      decimals: decimalsFn(number),
      noDecimals: numeral(number).format('0'),
      percentDecimals: numeral(number).format('0.00%'),
      percent: numeral(number).format('0%'),
      percentNoSymbol: numeral((number * 100)).format('0.00'),
      dataSizeMbs: number ? numeral(number / (1024 * 1024)).format('0.00') + 'MB' : '0.00MB',
      nfDecimals: nonFixedDecimalsFn(number),
      dynDecimals: dynDecimalsFn(number, options.decimalPlaces)
    }
  },
  weekDayList: [
    {
      label: 'Sun',
      value: 7
    },
    {
      label: 'Mon',
      value: 1
    },
    {
      label: 'Tue',
      value: 2
    },
    {
      label: 'Wed',
      value: 3
    },
    {
      label: 'Thu',
      value: 4
    },
    {
      label: 'Fri',
      value: 5
    },
    {
      label: 'Sat',
      value: 6
    }
  ]
}
