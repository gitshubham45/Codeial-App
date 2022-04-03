//express setup
const bodyParser=require('body-parser');
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
const  MongoStore =  require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

//app.use(express.urlencoded());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended:false,
}));

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'

}));



app.use(expressLayouts)

//extrxt style and script froom the sub-pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router

app.use(express.static('./assets'))
//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db
app.use(session({
    //TODO change the secret before deployment
    name:'codial',
    //TOdo change the secret before deployment
    secret:'blasbjnakm',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok')
        }
        
    )

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