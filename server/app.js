/* eslint-disable */
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const staticAsset = require('static-asset')
/* eslint-enable */

const app = express()

app.use(staticAsset(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

//Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: "Nicholas Blog"
    })
})

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