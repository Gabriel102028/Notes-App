const mongoose = require('mongoose');

// metodo de conneccíon al database mongoose

mongoose.connect('mongodb://localhost/notes-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
// me muestra si la database esta funcionando
 .then(db => console.log('database is connected..'))
 // .catch(err => console.err(err));


//  Seletc in MongoDB
 // use db-notes-app
 //show collections
 // db.notes.find().pretty