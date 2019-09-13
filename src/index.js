let express = require('express')
let app = express()
let classRoute = require('./routes/class')
let userRoute = require('./routes/user')
let path = require('path')
let bodyParser = require('body-parser')
let multer = require('multer')

// this should be revisioned
app.use(bodyParser.urlencoded({extended: true}))
app.use((req, res, next) => {
    console.log(`${new Date().toString()} ${req.ip} => ${req.originalUrl}`, req.body)
    next()
})
app.use(classRoute)
app.use(userRoute)
app.use(express.static('public'))

// Handler for 404 resource not found
app.use((req, res, next) => {
    res.status(404).send('We think you are lost!')
})

// Handler for 500 Server error
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has starter on ${PORT}`))