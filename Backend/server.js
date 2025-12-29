const express = require('express')
const path = require('path')
const quize = require('./routes/quizeRouter')
const auth = require('./routes/authRouter')
const connectDB = require('./config/dbConfig.js')
const dotenv = require('dotenv').config()
// const loadQuestion = require('./utils/loadQuestions.js')
const errorHandler = require('./middleware/errorHandler.js')
// const loadQuestion = require('./utils/loadSignQuestions.js')
const cors = require('cors')

connectDB()
// loadQuestion()
app.use(cors({
    origin:  'https://your-frontend-url.vercel.app',
    credentials: true
}))
const app = express()
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'data/images')))
app.use(express.static(path.join('..','frontend')))

const port = process.env.PORT || 5000

app.use('/api', quize)
app.use('/api', auth)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is open at port ${port}`)
})