const { isValidObjectId } = require("mongoose")
const Course = require("../models/Course")
const ObjectId = require('mongoose').Types.ObjectId
const fs = require('fs');


//create course
const create = async (req) => {
    const course = new Course({
        title: req.body.title,
        description: req.body.description,
        field: req.body.field
    })

    try {

        return (await course.save())


    } catch (err) {
        return err
    }
}



//get all courses
const getAll = async () => {
    try {
        return (await Course.find().populate("field"))
    } catch (err) {
        return err
    }
}


//add new video
const addVideo = async (req) => {
    try {
        return (
            await Course.findByIdAndUpdate(
                { _id: req.params.courseId },
                {
                    $push: {
                        "video": {
                            "videoName": req.file.originalname,
                            "videoLocation": req.file.path
                        }
                    }

                }

            )
        )

    } catch (error) {
        return error
    }
}


//add course materials
const addDoc = async (req) => {
    try {
        return (
            await Course.findByIdAndUpdate(
                { _id: req.params.courseId },
                {
                    $push: {
                        "doc": {
                            "docName": req.file.originalname,
                            "docLocation": req.file.path
                        }
                    }

                }

            )
        )

    } catch (error) {
        return error
    }
}


//update course headers
const updateCourse = async (req) => {
    try {
        return (await Course.findByIdAndUpdate(
            { _id: req.params.courseId },
            {
                $set: { title: req.body.title, description: req.body.description }
            },
            { new: true },
            (err, data) => {
                if (err) {
                    return err
                } else {
                    return data
                }
            }
        ))
    } catch (err) {
        return err
    }
}



//get all videos by course-id
const getVideosByCourseId = async (req) => {
    try {
        return (await Course.find({ "_id": req.params.courseId }, { video: 1 }))
    } catch (error) {
        return error
    }
}


//delete course
const deleteCourse = async (req) => {
    try {
        return (await Course.deleteOne(req.param.courseId)
        )
    } catch (err) {
        return err
    }
}

//get video by video id
const getVideoByVideoId = async (req) => {
    try {
        return (await Course.aggregate([{
            $match: { 'video._id': ObjectId(req.params.videoId) }
        },
        {
            $project: {
                video: {
                    $filter: {
                        input: '$video',
                        as: 'vid',
                        cond: { $eq: ['$$vid._id', ObjectId(req.params.videoId)] }
                    }
                }
            }
        }
        ]))
    } catch (error) {
        return error
    }
}



const getDocByDocId = async (req) => {
    try {
        return (await Course.aggregate([{
            $match: { 'doc._id': ObjectId(req.params.docId) }
        },
        {
            $project: {
                doc: {
                    $filter: {
                        input: '$doc',
                        as: 'doc',
                        cond: { $eq: ['$$doc._id', ObjectId(req.params.docId)] }
                    }
                }
            }
        }
        ]))
    } catch (error) {
        return error
    }
}

// get materials by course id
const getMaterialsByCourseId = async (req) => {
    try {
        return (await Course.find({ "_id": req.params.courseId }, { doc: 1 }))
    } catch (error) {
        return error
    }
}

//stream video
const streamVideo = async (req) => {

    try {
        const path = await Course.aggregate([{
            $match: { 'video._id': ObjectId(req.params.videoId) }
        },
        {
            $project: {
                video: {
                    $filter: {
                        input: '$video',
                        as: 'vid',
                        cond: { $eq: ['$$vid.videoLocation', ObjectId(req.params.videoId)] }
                    }
                }
            }
        }
        ])
    } catch (error) {
        return error
    }

    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1
        const chunksize = (end - start) + 1
        const file = fs.createReadStream(path, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        return file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        return fs.createReadStream(path).pipe(res)
    }

}


module.exports = {
    getAll,
    create,
    updateCourse,
    deleteCourse,
    addVideo,
    addDoc,
    getVideosByCourseId,
    getVideoByVideoId,
    streamVideo,
    getMaterialsByCourseId,
    getDocByDocId
}