const mongoose = require('mongoose')

const quizAtemptScheme = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: [true, 'There is no user ']
    },
    quizSetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'QuizSessionId is required']
    },
    answers: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                required: [true, 'Please add question Id']
            },
            selectedIndex: {
                type: Number,
                required: [true, 'Please add your answer']
            },
            correctIndex: {
                type: Number,
                required: [true, 'Please add correct answer']
            },
            isCorrect: {
                type: Boolean,
                required: [true, 'Please cheack you answer']
            },
            answeredAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    finalScore: {
        type: Number,
        default: null
    },
    submitted: {
        type: Boolean,
        default: false
    }
}, {
    timeStamps: true
})

module.exports = mongoose.model('QuizAttempt', quizAtemptScheme)