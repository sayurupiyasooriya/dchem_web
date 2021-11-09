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

    }
})

module.exports = mongoose.model('Fields', FieldScheema)