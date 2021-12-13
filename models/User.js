const mongoose = require('mongoose')
const Courses = require('./Course')


const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    courseId: [{
        type: mongoose.Types.ObjectId,
        ref: 'Courses',
        require: true
    }],

    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
})

module.exports = mongoose.model('Users', UserSchema)