const express = require('express')
const router = express.Router()
const { Post } = require('../server/models/post')
const { User } = require('../server/models/user')

let showPosts = (req, res) => {
    const userId = req.session.userId
    const userLogin = req.session.userLogin

    const perPage = parseInt(process.env.PER_PAGE)
    const page = req.params.page || 1

    Post.find({}).skip(perPage * page - page)
        .limit(perPage)
        .populate('owner')
        // .sort({}) To add createdAd and sort by date
        .then(posts => {
            Post.count()
                .then(count => {
                    res.render('index', {
                        posts,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        user: {
                            id: userId,
                            login: userLogin
                        }
                    })
                })
        })
        .catch(err => console.log(err))
}


router.get('/', (req, res) => {
    showPosts(req, res)
})

router.get('/archive/:page', (req, res) => {
    showPosts(req, res)
})


router.get('/posts/:post', (req, res, next) => {
    const url = req.params.post.trim().replace(/ +(?= )/g, '')
    const userId = req.session.userId
    const userLogin = req.session.userLogin

    if (!url) {
        const err = new Error('not found')
        err.status = 404
        next(err)
    } else {
        Post.findOne({
            url
        }).then(post => {
            if (!post) {
                const err = new Error('not found')
                err.status = 404
                next(err)
            } else {
                res.render('post/post', {
                    post,
                    user: {
                        id: userId,
                        login: userLogin
                    }
                })
            }
        })
    }
})

//users posts
router.get('/users/:login/:page*?', (req, res) => {
    const userId = req.session.userId
    const userLogin = req.session.userLogin

    const perPage = parseInt(process.env.PER_PAGE)
    const page = req.params.page || 1
    const login = req.params.login

    User.findOne({
        login
    }).then(user => {
        Post.find({
            owner: user._id
        }).skip(perPage * page - page)
            .limit(perPage)
            .then(posts => {
                console.log(posts)
                Post.count({
                    owner: user._id
                })
                    .then(count => {
                        res.render('index', {
                            posts,
                            current: page,
                            pages: Math.ceil(count / perPage),
                            user: {
                                id: userId,
                                login: userLogin
                            }
                        })
                    })
            })
            .catch(err => console.log(err))

    })


})

module.exports = router