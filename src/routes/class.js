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
            res.status(500), json(err)
        })
})

// Get all classes a user can register
// GET localhost:3000/classesUserCanRegister?email=kobi@gmail.com
router.get('/classesUserCanRegister', (req, res) => {
    if (!req.query.email) {
        return res.status(400).send('Missing URL parameter: email')
    }

    ClassModel.find({ students: { $not: { $eq: req.query.email } } })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500), json(err)
        })
})

// Get all classes of a user
// GET localhost:3000/classesOfUser?email=kobi@gmail.com
router.get('/classesOfUser', (req, res) => {
    if (!req.query.email) {
        return res.status(400).send('Missing URL parameter: email')
    }

    ClassModel.aggregate([
        {
            $match: {
                $or: [
                    { students: req.query.email },
                    { teacher: req.query.email }
                ]
            }
        },
        {
            $project: {
                id: 1,
                name: 1,
                icon: 1
            }
        }
    ])
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500), json(err)
        })
})

// Get the upcoming class of a user
// GET localhost:3000/nextClass?email=kobi@gmail.com
router.get('/nextClass', (req, res) => {
    if (!req.query.email) {
        return res.status(400).send('Missing URL parameter: email')
    }

    var date = new Date()
    var weekday = new Array(7)
    weekday[0] = "Sunday"
    weekday[1] = "Monday"
    weekday[2] = "Tuesday"
    weekday[3] = "Wednesday"
    weekday[4] = "Thursday"
    weekday[5] = "Friday"
    weekday[6] = "Saturday"
    var currDay = weekday[date.getDay()]
    var currTime = date.getHours() + ":" + date.getMinutes()
    ClassModel.aggregate([
        {
            $match: {
                $or: [
                    { students: req.query.email },
                    { teacher: req.query.email }
                ]
            }
        },
        {
            $project: {
                id: 1,
                name: 1,
                icon: 1
            }
        },
    ])
        .sort({
            $sort: {
                "time.day": 1,
                "time.from": 1
            }
        })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500), json(err)
        })
})

// Get a class
// GET localhost:3000/class?id=1234
router.get('/class', (req, res) => {
    if (!req.query.id) {
        return res.status(400).send('Missing URL parameter: id')
    }

    ClassModel.findOne({
        id: req.query.id
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500), json(err)
        })
})


// Update a class
// PUT localhost:3000/class?id=1234
router.put('/class', (req, res) => {
    if (!req.query.id) {
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
            res.status(500), json(err)
        })
})

// Update a specific class field
// PATCH localhost:3000/class?id=1234
router.patch('/class', (req, res) => {
    if (!req.query.id) {
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
            res.status(500), json(err)
        })
})

// Delete a class
// DELETE localhost:3000/class?id=1234
router.delete('/class', (req, res) => {
    if (!req.query.id) {
        return res.status(400).send('Missing URL parameter: id')
    }

    ClassModel.findOneAndRemove({
        id: req.query.id
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500), json(err)
        })
})


// Create a new class
// POST localhost:3000/class
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

//================== QUIZ APIs ==================//

// GET all quizes of a class
// GET localhost:3000/classQuizes?id=1111
router.get('/classQuizes', (req, res) => {
    if (!req.query.id) {
        return res.status(400).send('Missing URL parameter: id')
    }

    ClassModel.aggregate([{$project: {quizes: 1}}])
})

module.exports = router