const express = require('express');
const router = express.Router()
const Course = require('../models/Course')
const fs = require('fs')
const ObjectId = require('mongoose').Types.ObjectId
const {
    getAll,
    create,
    updateCourse,
    deleteCourse,
    addVideo,
    addDoc,
    getVideosByCourseId,
    getVideoByVideoId,
    getDocByDocId,
    getMaterialsByCourseId
} = require('../controllers/CourseController');
const multer = require('multer');
const { response } = require('express');

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
    }
    res.json(err)
})

// add a video
router.post('/upload/video/:courseId', upload.single('video'), async (req, res) => {


    const field = await addVideo(req)
    return res.json(field)


})
// add a doc
router.post('/upload/material/:courseId', upload.single('material'), async (req, res) => {


    const field = await addDoc(req)
    return res.json(field)


})

//get videos by course id
router.get('/videos/:courseId', async (req, res) => {

    const videos = await getVideosByCourseId(req)
    return res.json(videos)


})

//get docs by course id
router.get('/docs/:courseId', async (req, res) => {

    const docs = await getMaterialsByCourseId(req)
    return res.json(docs)


})

//get videos by course id
router.get('/docs/:courseId', async (req, res) => {

    const docs = await getMaterialsByCourseId(req)
    return res.json(docs)


})

//get video by video id
router.get('/video/:videoId', async (req, res) => {

    const video = await getVideoByVideoId(req)
    return res.json(video)
})


router.get('/doc/:docId', async (req, res) => {

    const doc = await getDocByDocId(req)
    return res.json(doc)
})

router.get('/doc/download/:docLocation', async (req, res) => {
    const doc = req.params.docLocation
    res.download(doc)
})


router.get('/video/stream/:videoId', async (req, res) => {

    let path = await Course.find({ 'video._id': ObjectId(req.params.videoId) }, { 'video.videoLocation.$': 1 })

    path = path[0].video[0].videoLocation

    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        return file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }

})
module.exports = router
