const g1SignQuestions = require('../data/g1Sign')
const SignQuestion = require('../models/SignQuestion')

const loadQuestion = async () => {
    await SignQuestion.deleteMany()

    const questions = g1SignQuestions.g1SignQuestions

    const loaded = questions.forEach(async element => {
        // console.log(element.category)
        const formattedOption = element.options.map((opt, index) => ({
            text: opt,
            isCorrect: index+1 === element.answer
        }))

        const loadedqn = await SignQuestion.create({
            image: {
                file: element.image.file
            },
            option: formattedOption,
            topic: element.topic,
            category: element.category
        })

        console.log(loadedqn)
    })
}

module.exports = loadQuestion