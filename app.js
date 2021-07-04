const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config')
const postRoute = require('./routes/post')
const userRoute = require('./routes/user')
const cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json())

app.use('/post', postRoute)
app.use('/user', userRoute)


mongoose.connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => {
    console.log("Connected to db")
})

//listen to server
app.listen(3000)