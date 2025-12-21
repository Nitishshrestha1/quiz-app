const asyncHandler = require('express-async-handler')
const QUesiton = require('../models/Question')
const g1Questions = require('../data/g1Questions')

//@desc Get quizes
//@route GET /api/quize-start
//@access private
const getQuiz = asyncHandler( async (req,res) => {
    res.status(200).json(g1Questions)
})

//@desc Get your score
//@route GET /api//quiz/g1/submit
//@access private
const getScore = asyncHandler( async (req,res) => {
    const answers = req.body
    let marks = 0

    answers.forEach(element => {
        const qnId = element.id
        const answer = element.answer

        let match = g1Questions.g1Questions.find(element => qnId === element.id)

        if(answer === match.answer) {
            marks++
        }
    });
    res.status(200).json({marks})
})

module.exports = {
    getQuiz,
    getScore
}