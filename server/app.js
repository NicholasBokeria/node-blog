/* eslint-disable */
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const staticAsset = require('static-asset')
const routes = require('../routes')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
/* eslint-enable */

const app = express()

/* TO ADD - config sessionsecret, mongoose in app.js
app.use(session({
    secret: config.SESSION_SECRET,
    resolve: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}))
*/
app.use(staticAsset(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../public')))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

//Routes
app.get('/', (req, res) => {
    res.render('index', {
        date : new Date().getFullYear()
    })
})

app.use('/api/auth', routes.auth)

//catch 404
app.use((req, res, next) => {
    const err = new Error('Not found')
    err.status = 404
    next(err)
})

//error handler
/* eslint-disable */
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.render('error', {
        message: error.message,
        title: 'Oopps..'
    })
})
/* eslint-enable */

module.exports = { app }
