const mongoose = require('mongoose');

const FieldScheema = mongoose.Schema({
    name: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Field', FieldScheema)