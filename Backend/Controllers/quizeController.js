const asyncHandler = require('express-async-handler')
const Quesitons = require('../models/Question')
const g1Questions = require('../data/g1Questions')
const createQuestion = require('../utils/createQuestion.js')
const { options } = require('../routes/quizeRouter.js')
const Question = require('../models/Question')
const QuizAttempt = require('../models/QuizAttempt.js')
const createSignQuestion = require('../utils/createSignQuestions.js')
const SignQuestion = require('../models/SignQuestion.js')
const QuestionSet = require('../models/QuestionSet.js')

//@desc Get quizes
//@route GET /api/quiz/g1
//@access private
const getQuiz = asyncHandler( async (req,res) => {
    const userId = req.user.id
    const rawQuestionSet = await createQuestion(userId)

    const quizSetId = rawQuestionSet.questionSetId

    const attempt = await QuizAttempt.create({
        userId: req.user.id,
        quizSetId: quizSetId
    })
    const sessionId = attempt._id

    const questionSet = rawQuestionSet.newQuestionSet.map( q => ({
        _id: q._id,
        question: q.question,
        option: q.option.map(o => o.text)
    }))

    res.status(200).json({questionSet, quizSetId, sessionId})
})

//@desc Get your score
//@route GET /api/quiz/g1/submit
//@access private
const checkAnswer = asyncHandler( async (req,res) => {
    const {answer, sessionId, quizSetId} = req.body
    let isCorrect = false

    const questionSet = await QuestionSet.findOne({_id: quizSetId})
    if(!questionSet) return res.status(404).json({message: 'Question not found'})

    const questions = questionSet.questions
    const qn = questions.find(qn =>
        qn.questionId.equals(answer.id)
    )
        
    let correctIndex = 0
    for(const index of qn.option) {
        if(index.isCorrect === true) break
        else correctIndex++
    }

    res.status(200).json({correctIndex})

    if(correctIndex === answer.answer) isCorrect = true

    const attempt = await QuizAttempt.findOne({_id: sessionId.toString()})
    if(!attempt || attempt.submitted) {
        return res.status(400).json({message: 'Invalid attempt'})
    }

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
})

//@desc Get quizes
//@route GET /api/quiz/g1/result/:sessionId
//@access private
const getResult = asyncHandler( async (req,res) => {
    const sessionId = req.params.sessionId
    if(!sessionId) res.status(400).json({message: 'There is no sessionId'})

    const quizSession = await QuizAttempt.findOne({_id: sessionId})
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

//@desc Get sing related quizes
//@route GET /api/practice/signs
//@access private
const getSignQuiz = asyncHandler( async (req,res) => {
    const userId = req.user.id
    const rawQuestionSet = await createSignQuestion(userId)

    const quizSetId = rawQuestionSet.questionSetId

    const attempt = await QuizAttempt.create({
        userId: req.user.id,
        quizSetId: quizSetId
    })
    const sessionId = attempt._id

    const questionSet = rawQuestionSet.newQuestionSet.map( q => ({
        _id: q._id,
        question: q.question,
        imageUrl: q.image.url,
        option: q.option.map(o => o.text)
    }))

    res.status(200).json({questionSet, quizSetId, sessionId})
})


module.exports = {
    getQuiz,
    checkAnswer,
    getResult,
    getSignQuiz
}