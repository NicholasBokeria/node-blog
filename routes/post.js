const express = require('express')
const router = express.Router()
const { Post } = require('../server/models/post')

//Get for add
router.get('/add', (req, res) => {
    res.render('post/add')
})

//Post is add
router.post('/add', (req, res) => {
    const title = req.body.title.trim()
    const body = req.body.postBody

    if (!title || !body) res.json({ error: 'please fill title and body' })

    if (title.length < 4 && body.length < 10) {
        res.json({ error: 'Length' })
    } else {
        let post = new Post({
            title, body
        })

        post.save()
            .then(post => {
                console.log(post)
            }).catch(() => {
                res.json({error: 'Cannot create post, try later'})
            })
    }

    res.json({
        ok: true
    })
})

module.exports = router