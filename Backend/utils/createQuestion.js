const Question = require('../models/Question')
const { questionFormat } = require('../constants')

const createQuestion = async () => {
    let newQuestionSet = []
    questionFormat.forEach(async element => {
        const qns = await Question.find({category: element.category})
        let numberOfQn = element.numberOfQn

        // console.log(`${element.category} = ${qns.length}`)

        while (numberOfQn > 0) {
            const randomIndex = Math.floor(Math.random() * qns.length)
            const choosenqn = qns[randomIndex]

            
            newQuestionSet.push(choosenqn)
            qns.splice(randomIndex, 1)

            numberOfQn--
        }
        return newQuestionSet
    })
}

module.exports = createQuestion
