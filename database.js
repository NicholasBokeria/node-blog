const { MONGODB_URI } = require('./config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(MONGODB_URI)

module.exports = { mongoose }
