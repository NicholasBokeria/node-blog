const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs')

const arr = ['Hello', 'World', 'Test']

app.get('/', (req, res) => res.render('index', {
    arr
}))

app.get('/create', (req, res) => res.render('create'))
app.post('/create', (req, res) => {
    arr.push(req.body.text)
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Server started')
})