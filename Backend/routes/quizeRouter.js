const express = require('express')
const router = express.Router()

router.get('/quize-start', (req,res) => {
    res.status(200).json({message: 'Quize has been started'})
})

router.get('/score', (req,res) => {
    res.status(200).json({message: 'this is your score'})
})

module.exports = router