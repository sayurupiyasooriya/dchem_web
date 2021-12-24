const bcrypt = require('bcryptjs')
const User = require('../models/User')
const db = require('../models');

const Role = db.role;
const Course = db.course;

const login = async (req) => {

    //get password from database
    const user = await User.findOne({ email: req.body.email })
    if (!user) return 0

    // password is correct
    const checkPw = await bcrypt.compare(req.body.password, user.password)
    if (!checkPw) return 1
    else return user

}


const createUser = async (req) => {
    // check for duplicate user
    const duplicate = await User.findOne({ email: req.body.email })
    if (duplicate) return 0

    // hash password
    let salt = await bcrypt.genSalt(10)
    let hashedPw = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPw,
        email: req.body.email
    })
    if (req.body.roles) {
        user.roles = await Role.find({
            name: { $in: req.body.roles }
        },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err })
                }
                return roles
            })

    } else {
        user.roles = await Role.findOne({ name: "user" }, (err, role) => {
            if (err) {
                res.status(500).send({ message: err })
            }
            return role
        })
    }
    if (req.body.courses) {
        user.courseId = await Course.find({
            title: { $in: req.body.courses }
        },
            (err, courses) => {
                if (err) {
                    res.status(500).send({ message: err })
                }
                return courses
            })
    }
    try {
        return (await user.save());
    } catch (error) {
        return error
    }
}



exports.createUser = createUser
exports.login = login