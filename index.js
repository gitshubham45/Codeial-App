//express setup
const express=require('express');
const app=express();
const port=8000;

const expressLayouts = require('express-ejs-layouts');

const db=require('./config/mongoose.js');

app.use(expressLayouts)

//extrxt style and script froom the sub-pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes'));
app.use(express.static('./assets'))
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