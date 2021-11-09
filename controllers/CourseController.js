const Course = require("../models/Course")


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


const getAll = async () => {
    try {
        return (await Course.find().populate("field"))
    } catch (err) {
        return err
    }
}

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

const addDoc = async (req) => {
    try {
        return (
            await Course.findByIdAndUpdate(
                { _id: req.body.courseId },
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

const deleteCourse = async (req) => {
    try {
        return (await Course.deleteOne(req.param.courseId)
        )
    } catch (err) {
        return err
    }
}


module.exports = {
    getAll,
    create,
    updateCourse,
    deleteCourse,
    addVideo,
    addDoc
}