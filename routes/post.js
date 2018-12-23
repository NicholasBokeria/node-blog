const express = require('express')
const router = express.Router()

//Get for add
router.get('/add', (req, res) => {
    res.render('post/add')
})

//Post for add
router.post('/add', (req, res) => {
    res.json({
        ok: true
    })
})

module.exports = router