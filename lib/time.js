const moment = require('moment-timezone')
const momentDurationFormatSetup = require('moment-duration-format')
const _ = require('./lodash-mixins')
const timesync = require('timesync')

let ts = null

ts = {
  now: () => (Date.now())
}

momentDurationFormatSetup(moment)

const timeZone = moment.tz.guess()

let self = module.exports = {
  initialOffset: null,
  maxOffset: null,
  avgOffset: null,
  addOffsetHandler: (fn) => { ts.on('change', fn) },
  init: (offsetFn) => {
    ts = timesync.create({
      server: '/api/v1/timesync',
      interval: 60000 * 1 // every 5 minute
    })

    self.addOffsetHandler((offset) => {
      if (self.initialOffset === null) {
        self.initialOffset = offset
        self.maxOffset = offset
        self.avgOffset = offset
      } else {
        self.avgOffset = (self.avgOffset + offset) / 2
      }

      if (offset > self.maxOffset) {
        self.maxOffset = offset
      }
    })

    if (offsetFn) {
      // get notified on changes in the offset
      self.addOffsetHandler(offsetFn)
    }
  },
  setUser: (user) => {
    if (user.timezone !== '99') {
      self.timeZone = user.timezone
    } else {
      self.timeZone = timeZone
    }
  },
  browserTimeZone: timeZone,
  timeZone,
  getDuration: (value, units) => (moment.duration(value, units)),
  setTimeZone: (tz) => { self.timeZone = tz },
  now: () => (ts.now()),
  isBeforeNow: (msTime, buffer = 0) => (self.normalizeTime(msTime) < (self.now() + buffer)),
  isAfterNow: (msTime, buffer = 0) => (self.normalizeTime(msTime) > (self.now() + buffer)),
  getAfterNowDelta: (msTime) => (self.normalizeTime(msTime) - self.now()),
  getBeforeNowDelta: (msTime) => (self.now() - self.normalizeTime(msTime)),
  getMoment: (dataSource) => {
    if (!dataSource) {
      dataSource = self.now()
    }
    return moment(dataSource)
  },
  getTzMoment: (dateSource) => (self.getMoment(dateSource).tz(self.timeZone)),
  getUtcTimestamp: (dateTimeInputString) => moment.tz(dateTimeInputString, self.timeZone).valueOf(),

  getTimeFromSeconds: (seconds, format = 'h:mm a') => {
    if (seconds) {
      return moment().startOf('day')
        .seconds(seconds)
        .format(format)
    }
  },
  normalizeTime: (val) => {
    if (_.isString(val)) {
      val = parseInt(val)
    }

    val = val || 0
    if (Math.ceil(Math.log10(val)) <= 10) {
      val = val * 1000
    }

    return val
  },
  checkValidDate: (dateString, format = 'D/MM/YY, HH:mm') => {
    return moment(dateString, format, true).isValid()
  },
  getTimeSyncHandler: () => (require('timesync/server').requestHandler)
}
