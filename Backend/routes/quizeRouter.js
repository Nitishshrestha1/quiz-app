const express = require('express')
const router = express.Router()
const {
    getQuiz,
    getScore
} = require('../Controllers/quizeController')
const authintication = require('../middleware/authMiddleware')

router.get('/quiz/g1',authintication, getQuiz)

router.post('/quiz/g1/submit', getScore)

router.get('/quiz/g1/result/:quizId', (req,res) => {
    res.status(200).json({message: 'this is your result'})
})

router.get('/practice/signs', (req,res) => {
    res.status(200).json({message: 'these are sign questions'})
})

router.get('/user/progress', (req,res) => [
    res.status(200).json({message: 'this is your progress'})
])

module.exports = router