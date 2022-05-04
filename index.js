//express setup
const bodyParser=require('body-parser');
const express=require('express');
const env = require('./config/environment');
const app=express();        

const cookieParser =require('cookie-parser');
const port=8000;

const expressLayouts = require('express-ejs-layouts');

const db=require('./config/mongoose.js');

//Used for session cookie
const session = require('express-session');
const passport=require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const  MongoStore =  require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware')
const passportGoogle = require('./config/passport-google-oauth2-strategy');

//setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_sockets').chatSockets(chatServer);

const path = require('path');

chatServer.listen(5000);
console.log('Chat Server is listening on port 5000')
app.use(sassMiddleware({
    src:path.join(__dirname,env.asset_path,'scss'),
    dest:path.join(__dirname,env.asset_path,'css'),
    debug:true,
    outputStyle:'extended',
    prefix:'/css'

}));

//app.use(express.urlencoded());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended:false,
}));




app.use(expressLayouts);

app.use(express.static(env.asset_path));

//make the uploads paths available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));


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
    secret:env.session_cookie_key,
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

app.use(flash());
app.use(customMware.setFlash);

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