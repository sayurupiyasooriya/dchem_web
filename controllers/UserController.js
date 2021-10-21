const bcrypt = require('bcryptjs')
const User = require('../models/User')

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
        email: req.body.email,
        courses: req.body.courseID,
        usertype: req.body.usertype
    })
    try {
        return (await user.save());
    } catch (error) {
        return error
    }
}



exports.createUser = createUser
exports.login = login