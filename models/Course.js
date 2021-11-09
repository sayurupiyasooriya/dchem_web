const mongoose = require('mongoose');
const Fields = require("./Field")
const Users = require('./User')

mongoose.set('useFindAndModify', false);
const CourseScheema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    video: [{
        videoName: String,
        videoLocation: String

    }],
    doc: [{
        docName: String,
        docLocation: String

    }],
    field: {
        type: mongoose.Types.ObjectId,
        ref: 'Fields',
        require: true

    }
})

module.exports = mongoose.model('Courses', CourseScheema)