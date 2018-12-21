const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
/* eslint-disable */
const { Post } = require('./models/post')
/* eslint-enable */

const app = express()
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index')
})


module.exports = { app }
