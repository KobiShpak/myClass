let express = require('express')
let router = express.Router()

// QueryString => Query property on the request objext
// localhost:3000/person?name-kobi&age=26
router.get('/person', (req, res) => {
    if (req.query.name){
        res.send(`You have requested a person ${req.query.name}`)
    }
    else {
        res.send('You have requested a person')
    }
})

// Params property object on the request objest
// localhost:3000/person/kobi
router.get('/person/:name', (req, res) => {
    res.send(`You have requested a person ${req.params.name}`)
})

router.get('/error', (req, res) => {
    throw new Error('This is a forced error.')
})

module.exports = router