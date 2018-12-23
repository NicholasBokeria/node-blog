const express = require('express')
const router = express.Router()
const { User } = require('../server/models/user')
const bcrypt = require('bcrypt-nodejs')
const validator = require("email-validator");

//Router registration
router.post('/register', (req, res) => {
    const email = req.body.email
    const login = req.body.login
    const password = req.body.password
    const repeatPassword = req.body.repeatPassword

    if (!email || !password || !repeatPassword || !login) {
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
    } else if (login.length < 3) {
        res.json({
            ok: false,
            error: 'Login is to short'
        })
    } else {
        bcrypt.hash(password, null, null, (err, hash) => {
            if (err) {
                throw new Error(err)
            }
            let user = new User({
                email,
                login,
                password: hash
            })
            user.save()
                .then(() => {
                    req.session.userId = user.id
                    req.session.userLogin = user.login

                    res.json({
                        ok: true
                    })
                })
                .catch(error => console.log(error))
        })
    }
})
//Router authorisation
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email })
        .then(user => {
            if (!user) {
                res.json({
                    ok: false,
                    error: 'Email or password is incorrect'
                })
            } else {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (err) throw new Error('Try again later...')

                    if (!response) {
                        res.json({
                            ok: false,
                            error: 'Email or password is incorrect'
                        })
                    } else {
                        req.session.userId = user.id
                        req.session.userLogin = user.login

                        res.json({
                            ok: true
                        });
                    }
                })
            }
        })
        .catch(error => console.log(error))
})

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(() => {
            res.redirect('/')
        })
    } else {
        res.redirect('/')
    }
})

module.exports = router