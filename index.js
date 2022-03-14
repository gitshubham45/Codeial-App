//express setup
const express=require('express');
const app=express();
const port=8000;

//use express router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        //console.log('Error: ',err); can be written like this using back-ticks
        console.log(`Error in running the server: ${err}`);
    }
    else{
        console.log(`Server is running on port: ${port}`);
    }
});