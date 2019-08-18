let mongoose = require('mongoose')

const user = 'Admin'
const password = 'NatanelTheKing1234'
const server = 'myclass-8xnfx.mongodb.net'
const database = 'Classes'

mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}`, {
    useNewUrlParser: true,
    useCreateIndex: true
  })

let ClassSchema = new mongoose.Schema({
    name: String,
    id: {
        type: String,
        required: true,
        unique: true
    }, 
    location: String, 
    time: [Date], // dates when the class take place
    teacher: String, // teacher's email
    students: [Number], // student_email(s)
    items: [Number], // id's of files loaded in the mongo bucket 
    quizes: [String] // quiz names
})

module.exports = mongoose.model('Class', ClassSchema)