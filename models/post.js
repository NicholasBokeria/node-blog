const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    },
    createdAt: {
        type: Number
    }
})

let Post = mongoose.model('Post', PostSchema)

module.exports = { Post }