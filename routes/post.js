const express = require('express');
const router = express.Router()
const Post = require('../models/Post')


// get all posts
router.get('/', async (req, res) => {
    try {
        const post = await Post.find()
        res.json(post)
    } catch (err) {
        res.json({ message: err })
    }
})


// save a new post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    try {

        const posted = await post.save()
        res.json(posted)

    } catch (err) {
        res.json({ message: err })
    }

})

// get post by id
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        res.json(post)
    } catch (err) {
        res.json({ message: err })
    }
})


// update post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.postId },
            { $set: { title: req.body.title } })
        res.json(updatedPost)
    } catch (err) {
        res.json({ message: err })
    }
})


// delete a post
router.delete('/:postId', async (req, res) => {
    try {
        const deletedPost = await Post.deleteOne(req.param.postId)
        res.json(deletedPost)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router
