const Question = require('../models/Question')
const { questionFormat } = require('../constants')
const QuestionSet = require('../models/QuestionSet')

const createQuestion = async (userId) => {
    let newQuestionSet = []

    const questionSet = await QuestionSet.create({
        userId: userId
    })
    const questionSetId = questionSet._id

    for(const element of questionFormat ){
        const qns = await Question.find({category: element.category})
        let numberOfQn = element.numberOfQn

        // console.log(`${element.category} = ${qns.length}`)

        while (numberOfQn > 0) {
            const randomIndex = Math.floor(Math.random() * qns.length)
            const choosenqn = qns[randomIndex]
            
            newQuestionSet.push(choosenqn)
            qns.splice(randomIndex, 1)

            questionSet.questions.push({
                questionId: choosenqn._id,
                option: choosenqn.option
            })
            numberOfQn--
        }
    }

    await questionSet.save()
    return {
        questionSetId,
        newQuestionSet
    }
}

module.exports = createQuestion
