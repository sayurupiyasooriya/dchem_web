const express = require('express');
const router = express.Router();
const Field = require('../models/Field');
const multer = require('multer')
const { getAll, create } = require('../controllers/FieldController');


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
    fields = await getAll()
    return res.json(fields)
})

//create a new field
router.post('/create', upload.single('field'), async (req, res) => {
    console.log(req.file)

    const field = await create(req)
    return res.json(field)


})

router.get('/getCourseImage', async (req, res) => {
    const path = require('path');
    const appDir = path.dirname(require.main.filename);
    const filePath = appDir + "/uploads/1629145132640-681832263ID Copy-page-001.jpg"
    return res.sendFile(filePath)
})


module.exports = router