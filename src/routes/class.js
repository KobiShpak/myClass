let ClassModel = require('../models/class.model')
let express = require('express')
let router = express.Router()

// Get all class
// GET localhost:3000/class
router.get('/classes', (req, res) => {
    ClassModel.find({})
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500),json(err)
    })
})

// Get a class
// GET localhost:3000/class?id=1234
router.get('/class', (req, res) => {
    if (!req.query.id){
        return res.status(400).send('Missing URL parameter: id')
    }

    ClassModel.findOne({
        id: req.query.id
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500),json(err)
    })
})


// Update a class
// PUT localhost:3000/class?id=1234
router.put('/class', (req, res) => {
    if (!req.query.id){
        return res.status(400).send('Missing URL parameter: id')
    }
    
    ClassModel.findOneAndUpdate({
        id: req.query.id
    }, req.body, {
        new: true
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500),json(err)
    })
})


// Delete a class
// DELETE localhost:3000/class?id=1234
router.delete('/class', (req, res) => {
    if (!req.query.id){
        return res.status(400).send('Missing URL parameter: id')
    }
    
    ClassModel.findOneAndRemove({
        id: req.query.id
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500),json(err)
    })
})


// Create a new class
// POST localhost:3000/class
// TODO: add required fields upon creation besides email
router.post('/class', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }
        
    let model = new ClassModel(req.body)
    model.save()
    .then(doc => {
        if (!doc || doc.length === 0) {
            return res.status(500).send(doc)
        }
        res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router