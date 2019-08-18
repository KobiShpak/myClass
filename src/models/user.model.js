let mongoose = require('mongoose')

const user = 'Admin'
const password = 'NatanelTheKing1234'
const server = 'myclass-8xnfx.mongodb.net'
const database = 'Users'

mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}`, {
    useNewUrlParser: true,
    useCreateIndex: true
  })

let UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: String, // Should be hashed
    type: String, // (Teacher/Student)
    classes: [Number], // class_id(s)
    grades: [Map], // Key: class_id, quiz_id, Value: grade 
    attendance: [Map] // Key: class_id, Value: attendance
})

module.exports = mongoose.model('User', UserSchema)