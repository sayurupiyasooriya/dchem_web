const express = require('express');
const router = express.Router();
const Field = require('../models/Field');
const multer = require('multer')
const { getAll, create, getFieldSelect } = require('../controllers/FieldController');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})
const upload = multer({ storage: storage })

//get all fields
router.get('/', async (req, res) => {
    const fields = await getAll()
    return res.json(fields)
})

//create a new field
router.post('/create', upload.single('image'), async (req, res) => {


    const field = await create(req)
    return res.json(field)


})

router.get('/fieldSelect', async (req, res) => {
    const fields = await getFieldSelect()
    return res.json(fields)
})



module.exports = router