const { MONGODB_URI } = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')

//const Blog = require('./models/blogs')
const notesRouter = require('./controllers/blogs')

const mongoose = require('mongoose')
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


app.use(cors())
app.use(express.json())
app.use('/api/blogs', notesRouter)


module.exports = app
