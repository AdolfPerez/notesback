const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

mongoose.connect(`mongodb+srv://Adolfo:${process.argv[2]}@cluster0.8ym4v.mongodb.net/note-app?retryWrites=true&w=majority`)

const Note = mongoose.model('Note', new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
}))

const note = new Note({
  content: 'CSS 2',
  date: new Date(),
  important: true,
})

note.save().then(/*result*/ () => {
  console.log('note saved!')
  mongoose.connection.close()
})

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})