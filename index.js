//express setup
const express=require('express');
const app=express();
const port=8000;

//use express router
app.use('/',require('./routes'));
//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        //console.log('Error: ',err); can be written like this using back-ticks
        console.log(`Error in running the server: ${err}`);
    }
    else{
        console.log(`Server is running on port: ${port}`);
    }
});