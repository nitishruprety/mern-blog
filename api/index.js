const express = require('express')
const router = require('./routes')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use(router)

app.use((error, req, resp, next) => {
    resp.status(error.status || 500)

    resp.send({error: error.message || 'Server error.'})
})

app.listen(3000, async () => {
    console.log('Server started at http://localhost:3000')
    await mongoose.connect('mongodb+srv://nitish:Password123@mern-blog.2llemwq.mongodb.net/mern-demo?retryWrites=true&w=majority')
    console.log('MongoDB connected')
})