const mongoose = require('mongoose')
const URLSlugs = require('mongoose-url-slugs')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserSchema'
    }
})

PostSchema.plugin(
    URLSlugs('title', {
        field: 'url'
    })
)

const Post = mongoose.model('Post', PostSchema)

module.exports = { Post }