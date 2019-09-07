let mongoose = require('mongoose')

const user = 'Admin'
const password = 'NatanelTheKing1234'
const server = 'myclass-8xnfx.mongodb.net'
const database = 'myClass'

mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}`, {
    useNewUrlParser: true,
    useCreateIndex: true
  })

let ClassSchema = new mongoose.Schema({
    name: String,
    icon: String, // icon url
    id: {
        type: Number,
        required: true,
        unique: true
    }, 
    location: String, 
    time: {
        type: [Map],
        of: String
    },
    teacher: String, // teacher_email
    students: [String], // student_email(s)
    items: [Number], // id's of files loaded in the mongo bucket 
    quizes: [String] // quiz urls
})

module.exports = mongoose.model('Class', ClassSchema)