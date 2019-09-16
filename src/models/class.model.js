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
    name: {
        type: String,
        unique: true
    },
    icon: String, // icon url
    location: String, 
    time: [{
        day: Number,
        from: String,
        until: String
    }],
    teacher: String, // teacher_email
    students: [String], // student_email(s)
    items: [{
        type: String,
        name: String,
        source: String
    }],  
    quizes: [{
        quiz_name: String,
        questions: [{
            question: String,
            answers: [{
                answer_id: Number,
                answer: String,
                correct: Boolean
            }] 
        }]
    }]
})

module.exports = mongoose.model('Class', ClassSchema)