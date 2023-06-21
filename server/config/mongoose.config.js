const mongoose = require('mongoose');
const username = "mongo-admin"
const password = "ok3IZqy5iVzLkC7U"

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.2pooxd6.mongodb.net/venture-vector`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Established a connection to the database'))
  .catch(err => console.log('Something went wrong when connecting to the database ', err));