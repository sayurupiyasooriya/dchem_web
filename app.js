const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config')
const courseRoute = require('./routes/courseRoute')
const userRoute = require('./routes/user')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { verifyToken, authentication } = require('./controllers/authentication')
const fieldRoute = require('./routes/fieldRoutes')
const userMasterRoute = require('./routes/UserMasterRoute')
const db = require("./models");
const Role = db.role;
const app = express()

const corsOptions = {
    origin: "http://localhost:3001"
}
app.use(cors())
app.use(express.json())
app.use('/course', courseRoute)
app.use('/user', userRoute)
app.use('/field', fieldRoute)
app.use('/uploads', express.static("uploads"))
// app.use(verifyToken)
app.use('/userMaster', userMasterRoute)



mongoose.connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => {
    console.log("Connected to db")
    initial()
})


function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}
//listen to server
app.listen(3000)