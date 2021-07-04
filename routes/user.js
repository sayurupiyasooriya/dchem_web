const express = require('express');
const router = express.Router()
const { createUser, login } = require('../controllers/UserController')

//routes
// create new user
router.post('/create', async (req, res) => {
    try {
        const user = await createUser(req)
        if (user === 0)
            res.status(400).send("Email Already Exists")
        else {
            res.json(user)
        }
    } catch (err) {
        res.json({ message: err })
    }

})

router.post('/login', async (req, res) => {
    try {
        const user = await login(req)
        if (user === 0)
            res.status(400).send("Wrong Credentials")
        else if (user === 1)
            res.status(400).send("Wrong Credentials")
        else {
            res.json(user)
        }
    } catch (err) {
        res.json({ message: err })
    }

})


module.exports = router
