const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config')
const postRoute = require('./routes/post')
const userRoute = require('./routes/user')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')
const { verifyToken, authentication } = require('./controllers/authentication')
const fieldRoute = require('./routes/fieldRoutes')

app.use(cors())

app.use(express.json())

app.use('/post', verifyToken, authentication, postRoute)
app.use('/user', userRoute)
app.use('/field', verifyToken, authentication, fieldRoute)


mongoose.connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => {
    console.log("Connected to db")
})

//listen to server
app.listen(3000)