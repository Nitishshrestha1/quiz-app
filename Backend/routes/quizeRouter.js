const express = require('express')
const router = express.Router()
const {
    getQuiz,
    checkAnswer,
    getResult,
    getSignQuiz
} = require('../Controllers/quizeController')
const authintication = require('../middleware/authMiddleware')

router.get('/quiz/g1',authintication, getQuiz)

router.post('/quiz/g1/submit',authintication, checkAnswer)

router.get('/quiz/g1/result/:sessionId', authintication, getResult)

router.get('/practice/signs', authintication, getSignQuiz)

router.get('/user/progress', (req,res) => [
    res.status(200).json({message: 'this is your progress'})
])

module.exports = router