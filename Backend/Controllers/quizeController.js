const asyncHandler = require('express-async-handler')
const Quesitons = require('../models/Question')
const g1Questions = require('../data/g1Questions')
const createQuestion = require('../utils/createQuestion.js')
const { options } = require('../routes/quizeRouter.js')
const Question = require('../models/Question')
const QuizAttempt = require('../models/QuizAttempt.js')

//@desc Get quizes
//@route GET /api/quiz/g1
//@access private
const getQuiz = asyncHandler( async (req,res) => {
    const rawQuestionSet = await createQuestion()

    const quizSessionid = crypto.randomUUID()

    const attempt = await QuizAttempt.create({
        userId: req.user.id,
        quizSessionId: quizSessionid
    })

    const questionSet = rawQuestionSet.map( q => ({
        _id: q._id,
        question: q.question,
        option: q.option.map(o => o.text)
    }))
    res.status(200).json({questionSet, quizSessionid})
})

//@desc Get your score
//@route GET /api//quiz/g1/submit
//@access private
const checkAnswer = asyncHandler( async (req,res) => {
    const {answer, sessionId} = req.body
    let isCorrect = false

    const attempt = await QuizAttempt.findOne({quizSessionId: sessionId})
    if(!attempt || attempt.submitted) {
        return res.status(400).json({message: 'Invalid attempt'})
    }

    const qn = await Question.findOne({_id: answer.id})
    if(!qn) return res.status(404).json({message: 'Question not found'})

    let correctIndex = 0
    for(const index of qn.option) {
        if(index.isCorrect === true) break
        else correctIndex++
    }
    if(correctIndex === answer.answer) isCorrect = true

    const existingAnswer = attempt.answers.find(
        a => a.questionId.toString() === answer.id
    )

    if(existingAnswer) {
        existingAnswer.selectedIndex = answer.answer
        existingAnswer.isCorrect = isCorrect
        existingAnswer.answeredAt = new Date()
    } else {
        attempt.answers.push({
            questionId: answer.id,
            selectedIndex: answer.answer,
            correctIndex,
            isCorrect
        })
    }
    await attempt.save()

    res.status(200).json({correctIndex})
})

//@desc Get quizes
//@route GET /api/quiz/g1/result/:sessionId
//@access private
const getResult = asyncHandler( async (req,res) => {
    const sessionId = req.params.sessionId
    if(!sessionId) res.status(400).json({message: 'There is no sessionId'})

    const quizSession = await QuizAttempt.findOne({quizSessionId: sessionId})
    if(!quizSession) return res.status(400).json({message: 'There is no such session opened'})
    if(req.user.id !== quizSession.userId.toString()) return res.status(400).json({message: 'The session doesnot belong to you'})
    if(quizSession.submitted) return  res.status(400).json({message: 'The quiz has already been attempted before'})

    const answers = quizSession.answers
    let marks = 0

    answers.forEach(element => {
        if(element.isCorrect) marks++
    })

    quizSession.finalScore = marks

    await quizSession.save()

    res.status(200).json(marks)
})


module.exports = {
    getQuiz,
    checkAnswer,
    getResult
}