const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const { getUsers } = require('../controllers/UserMasterController')


// login route
router.get('/', async (req, res) => {
    try {
        const users = await getUsers()
        res.json(users)
    } catch (err) {
        res.json({ message: err })
    }

})


module.exports = router
