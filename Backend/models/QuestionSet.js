const mongoose = require('mongoose')

const optionSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add an option']
    },
    isCorrect: {
        type: Boolean,
        default: false
    }
}, {_id: false})

const QuestionSetSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'There is no user ']
    },
    questions: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question',
                required: [true, 'Please add question Id']
            },
            option: {
                type: [optionSchema],
                validate: [
                    {
                        validator: function(v) {
                            return v.length === 4
                        },
                        message: 'A question must have exactly 4 options'
                    },
                    {
                        validator: function (v) {
                            return v.filter(o => o.isCorrect).length === 1
                        },
                        message: 'A question must have exactly one correct option'
                    }
                ]
            },
        }
    ],
}, {
    timestamps: true
})

module.exports = mongoose.model('QuestionSet', QuestionSetSchema)