const passport =require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User= require('../models/user');
const { userInfo } = require('os');

//tell passport to use new strategy to googlt logins
passport.use(new googleStrategy({
    clientID:"764611250446-h0b5ld68utb06uib1i0lkmmdd933mf5m.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback",
    },

    //
    function(accessToken,refreshToken,profile,done){
        //find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy-passport',err);return;}
            
            console.log(profile);

            if(user){
                //if found then set this user as req.user
                return done(null,user);
            }else{
                //if not found create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log('error in google strategy-passport',err);return;}

                    return done(null,user);
                });
            }
        })
    }
));

module.exports=passport;