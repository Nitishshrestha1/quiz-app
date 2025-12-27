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

const signQuestionSchema = mongoose.Schema({
    question: {
        type: String,
        default: 'What does this sign mean?',
        immutable: true
    },
    image: {
        file: {
            type: String,
            required: [true, "please add name of question"]
        }
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
    topic: {
        type: String,
        required: [true, 'Please add question topic']
    },
    category: {
        type: String,
        required: [true, 'Please add question category']
    }
},{ timestamps: true })

module.exports = mongoose.model('SignQuestion', signQuestionSchema)