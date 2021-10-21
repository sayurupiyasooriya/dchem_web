const express = require('express');
const router = express.Router()
const Course = require('../models/Course')
const { getAll, create, updateCourse, deleteCourse } = require('../controllers/CourseController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})
const upload = multer({ storage: storage })




// get all course
router.get('/', async (req, res) => {
    const allCourses = await getAll()
    res.json(allCourses)
})


// create a new course
router.post('/create', upload.single('imgCourse'), async (req, res) => {
    const createdCourse = await create(req)
    console.log(req.file)
    res.json(createdCourse)
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


//get Course by field id
router.get('/field/:fieldId', async (req, res) => {
    try {
        const course = await Course.find({ field: req.params.fieldId })
        res.json(course)
    } catch (error) {
        res.json({ message: error })
    }
})

// update course
router.patch('/:courseId', async (req, res) => {
    try {
        res.json(await updateCourse(req))
    } catch (err) {
        res.json(err)
    }
})


// delete a course
router.delete('/:courseId', async (req, res) => {
    try {
        res.json(await deleteCourse(req))
    } catch (err) {
        res.json(err)
    }
})

module.exports = router
