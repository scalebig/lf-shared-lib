module.exports = (arg) => (arg && decodeURI(arg).replace(/%2C/g, ','))
