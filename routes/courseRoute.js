const express = require('express');
const router = express.Router()
const Course = require('../models/Course')


// get all course
router.get('/', async (req, res) => {
    try {
        const course = await Course.find()
        res.json(course)
    } catch (err) {
        res.json({ message: err })
    }
})


// save a new course
router.post('/', async (req, res) => {
    const course = new Course({
        title: req.body.title,
        description: req.body.description
    })

    try {

        const course = await Course.save()
        res.json(posted)

    } catch (err) {
        res.json({ message: err })
    }

})

// get course by id
router.get('/:courseId', async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId)
        res.json(course)
    } catch (err) {
        res.json({ message: err })
    }
})


// update course
router.patch('/:courseId', async (req, res) => {
    try {
        const updatedCourse = await Course.updateOne({ _id: req.params.courseId },
            { $set: { title: req.body.title } })
        res.json(updatedCourse)
    } catch (err) {
        res.json({ message: err })
    }
})


// delete a course
router.delete('/:courseId', async (req, res) => {
    try {
        const deletedCourse = await Post.deleteOne(req.param.courseId)
        res.json(deletedCourse)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router
