const express = require('express')
const router = express.Router()
const { User } = require('../server/models/user')
const bcrypt = require('bcrypt-nodejs')
const validator = require("email-validator");

router.post('/register', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const repeatPassword = req.body.repeatPassword

    if (!email || !password || !repeatPassword) {
        res.json({
            ok: false,
            error: 'Check fields'
        })
    } else if (password != repeatPassword) {
        res.json({
            ok: false,
            error: 'Passwords does not match!'
        })
    } else if (!validator.validate(email)) {
        res.json({
            ok: false,
            error: 'Email is not valid!'
        })
    } else {
        bcrypt.hash(password, null, null, (err, hash) => {
            if (err) {
                throw new Error(err)
            }
            let user = new User({
                email,
                password: hash
            })
            user.save()
                .then(() => {
                    res.json({
                        ok: true
                    })
                })
                .catch(error => console.log(error))
        })
    }
})

module.exports = router