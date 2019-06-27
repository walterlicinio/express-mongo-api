const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

//GET Posts
router.get('/', async (req, res) => {
    const posts = await loadCollection()
    res.send(
        await posts.find({}).toArray()
    )
})


//ADD Posts
router.post('/', async (req, res) => {
    const posts = await loadCollection()
    await posts.insertOne({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })
    res.status(201).send()
})

//
async function loadCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://USER:PASSWORD@MONGOIP:27017', {
        useNewUrlParser: true
    })

    return client.db('devdb').collection('people')
}

module.exports = router;