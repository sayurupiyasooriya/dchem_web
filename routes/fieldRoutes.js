const express = require('express');
const router = express.Router();
const Field = require('../models/Field');

//get all fields
router.get('/', async (req, res) => {
    try {
        const field = await Field.find()
        res.json(field)
    } catch (err) {
        res.json({ message: err })
    }
})

//create a new field
router.post('/create', async (req, res) => {

    const field = new Field({
        name: req.body.name
    })

    try {
        const cField = await field.save()
        res.json(cField)
    } catch (err) {
        res.json({ message: err })
    }
})


module.exports = router