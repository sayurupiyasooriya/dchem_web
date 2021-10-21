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
    courses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Courses',
        require: true
    }],
    userType: {
        type: Number,
        require: true,
        default: 0
    }
})

module.exports = mongoose.model('Users', UserSchema)