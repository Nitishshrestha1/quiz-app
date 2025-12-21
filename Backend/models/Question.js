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

const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: [true, "Please add a question"]
    },
    option: {
        type: [optionSchema],
        validate: {
            validator: function(v) {
                return v.length === 4
            },
            message: 'A question must have exactly 4 options'
        }
    },
    topic: {
        type: String,
        required: [true, 'Please add question topic']
    },
    category: {
        type: String,
        required: [true, 'Please add question category']
    }
})

module.exports = mongoose.model('Question', questionSchema)