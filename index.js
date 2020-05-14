
let self = module.exports = {
  lfMath: require('./lib/lf-math'),
  lfNum: require('./lib/lf-num'),
  time: require('./lib/time'),
  lfRandom: (min, max, step, options) => {
    return self.lfNum(self.lfMath.genRandom(min, max, step))
  },
  formatters: require('./lib/formatters'),
  copy: require('./lib/copy'),
  delay: require('./lib/delay'),
  strings: require('./lib/strings'),
  mimeTypes: require('./lib/mime-types'),
  staticData: {
    states: require('./lib/data-states')
  },
  jsRuntime: require('./lib/js-runtime.js'),
  reportDataParsers: require('./lib/report-data-parsers'),
  reportShared: require('./lib/report-lib'),
  validators: require('./lib/validators'),
  buildInfo: require('./lib/build-info'),
  sequential: require('promise-sequential'),
  base64: require('./lib/base64'),
  jwt: require('./lib/jwt'),
  decodeURIEx: require('./lib/decodeURIEx'),
  _: require('./lib/lodash-mixins')
}
