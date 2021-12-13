const { isValidObjectId } = require("mongoose")
const User = require("../models/User")
const ObjectId = require('mongoose').Types.ObjectId
const fs = require('fs');


const getUsers = async () => {

    const users = await User.aggregate([
        {
            $lookup:
            {
                from: 'courses',
                localField: 'courseId',
                foreignField: '_id',
                as: 'courses'
            }
        },
        { $project: { "courses._id": 0, "courses._field": 0, "courses.date": 0, "courses.doc": 0, "courses.video": 0 } }
    ])
    console.log(users)

    return (users)
}

exports.getUsers = getUsers