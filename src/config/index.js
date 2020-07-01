const deepmerge = require('deepmerge')
const _config = require('./config')
const setting = require('./default').setting
const config = deepmerge(setting, _config)

module.exports = config
