const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./User");
db.role = require("./Role");
db.course = require("./Course");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
