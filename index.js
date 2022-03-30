//express setup
const express=require('express');
const app=express();

const cookieParser =require('cookie-parser');
const port=8000;

const expressLayouts = require('express-ejs-layouts');

const db=require('./config/mongoose.js');

//Used for session cookie
const session = require('express-session');
const passport=require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());


app.use(expressLayouts)

//extrxt style and script froom the sub-pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router

app.use(express.static('./assets'))
//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    //TODO change the secret before deployment
    secret:'blasbjnakm',
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

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