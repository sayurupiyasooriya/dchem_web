const mongoose = require('mongoose');

const FieldScheema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        imgName: String,
        imgLocation: String

    },
    teachers: [{}]
})

module.exports = mongoose.model('Field', FieldScheema)