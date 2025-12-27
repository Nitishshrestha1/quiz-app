const SignQuestion = require('../models/SignQuestion')

const createSignQuestion = async () => {
    let newQuestionSet = []

    const qns = await SignQuestion.find()
    let numberOfQn = 0

    while (numberOfQn < 20) {
        const randomIndex = Math.floor(Math.random() * qns.length)
        const choosenqn = qns[randomIndex]

        
        newQuestionSet.push(choosenqn)
        qns.splice(randomIndex, 1)

        numberOfQn++
    }

    return newQuestionSet
}

module.exports = createSignQuestion