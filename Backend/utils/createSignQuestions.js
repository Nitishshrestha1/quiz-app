const SignQuestion = require('../models/SignQuestion')
const QuestionSet = require('../models/QuestionSet')

async function createSignQuestion(userId) {
    let newQuestionSet = []

    const qns = await SignQuestion.find()
    let numberOfQn = 0

    const questionSet = await QuestionSet.create({
        userId: userId
    })
    const questionSetId = questionSet._id

    while (numberOfQn < 20) {
        const randomIndex = Math.floor(Math.random() * qns.length)
        const choosenqn = qns[randomIndex]

        
        newQuestionSet.push(choosenqn)
        qns.splice(randomIndex, 1)

        questionSet.questions.push({
            questionId: choosenqn._id,
            option: choosenqn.option
        })
        numberOfQn++
    }

    await questionSet.save()
    return {
        questionSetId,
        newQuestionSet
    }
}

module.exports = createSignQuestion