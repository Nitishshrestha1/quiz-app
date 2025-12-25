const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const authintication = asyncHandler ( async (req,res,next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401);
        throw new Error('Authorization token missing or invalid');
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) {
            res.status(401)
            throw new Error('User is not authorized')
        }
        req.user = decoded.user
        next()
    })
})

module.exports = authintication