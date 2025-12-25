const g1Questions = require('../data/g1Questions')
const Question = require('../models/Question')

const loadQuestion = async () => {
    await Question.deleteMany()

    const questions = g1Questions.g1Questions

    const loaded = questions.forEach(async element => {
        // console.log(element.category)
        const formattedOption = element.options.map((opt, index) => ({
            text: opt,
            isCorrect: index+1 === element.answer
        }))

        const loadedqn = await Question.create({
            question: element.question,
            option: formattedOption,
            topic: element.topic,
            category: element.category
        })

        console.log(loadedqn)
    })
}

module.exports = loadQuestion
