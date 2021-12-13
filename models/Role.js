const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Roles', RoleSchema)