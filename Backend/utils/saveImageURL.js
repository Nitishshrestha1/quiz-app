const SignQuestion = require('../models/SignQuestion')
const signMap = require('../config/cloudinarySignMap')
const mongoose = require('mongoose')

const loadImageUrl = async () => {
    
    const connect = await mongoose.connect('mongodb+srv://admin:admin@nitishcluster.jw9bwk2.mongodb.net/filestorageDs-backend?appName=nitishcluster');

    const question = await SignQuestion.find({'image.file': {$exists: true}})

    for (const q of question) {
        const publicId = signMap[q.image.file]

        if(!publicId) {
            console.log(`No mapping for ${q.image.file}`)
            continue
        }

        q.image = {
            file: q.image.file,
            publicId,
            url: `https://res.cloudinary.com/dc8dvdrjb/image/upload/${publicId}`
        }

        await q.save()
    }}

loadImageUrl()
