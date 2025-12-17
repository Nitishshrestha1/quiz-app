const express = require('express')
const path = require('path')
const quize = require('./routes/quizeRouter')
const auth = require('./routes/authRouter')
const connectDB = require('./config/dbConfig.js')
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorHandler.js')


connectDB()
const app = express()
app.use(express.static(path.join('..','frontend')))

app.use('/api', quize)
app.use('/api', auth)
app.use(errorHandler)

app.listen(5000, () => {
    console.log('Server is open at port 5000')
})