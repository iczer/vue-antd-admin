const deepmerge = require('deepmerge')
const _config = require('./config')
const {setting} = require('./default')
const config = deepmerge(setting, _config)

module.exports = config
