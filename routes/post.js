const express = require('express')
const router = express.Router()
const { Post } = require('../server/models/post')

//Get for add
router.get('/add', (req, res) => {
    const userId = req.session.userId
    if (!userId) {
        res.redirect('/')
    } else {
        res.render('post/add')
    }
})

//Post is add
router.post('/add', (req, res) => {
    const id = req.session.userId
    const title = req.body.title.trim()
    const body = req.body.postBody
    const owner = id

    if(id) {
        if (!title || !body) res.json({ error: 'please fill title and body' })

        if (title.length < 4 && body.length < 10) {
            res.json({ error: 'Length' })
        } else {
            let post = new Post({
                title, body, owner
            })
    
            post.save()
                .then(post => {
                    console.log(post)
                }).catch(() => {
                    res.json({ error: 'Cannot create post, try later' })
                })
        }
    
        res.json({
            ok: true
        })
    } else {
        res.redirect('/')
    }
})

module.exports = router