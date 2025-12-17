const asyncHandler = require('express-async-handler')

//@desc Get quizes
//@route GET /api/quize-start
//@access private
const getQuize = asyncHandler( async (req,res) => {
    res.status(200).json({message: 'Get quize questions'})
})

//@desc Get your score
//@route GET /api/score
//@access private
const getScore = asyncHandler( async (req,res) => {
    res.status(200).json({message: 'this is your score'})
})