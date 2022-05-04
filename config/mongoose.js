//require library
const mongoose= require('mongoose');
const env = require('./environment');

//connection to database
mongoose.connect(`mongodb://localhost/${env.db}`);

//acquire the connection (to check it is successful)
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print message
db.once('open',function(){
    console.log('successfully connected to the db');
})

//exporting
module.exports=db;