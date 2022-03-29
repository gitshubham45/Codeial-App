
const User=require('../models/user')

//profile page
module.exports.profile = function(req,res){
    res.render('user_profile',{
        title:"profile"
    })
}

//for sign
module.exports.signin = function(req,res){
    res.render('signin_page',{
        title:"codial | Sign In"
    })
}


//for sign-up
module.exports.signup = function(req,res){
    res.render('signup_page',{
        title:"codial | Sign Up"
    })
}

//for craeting profile
module.exports.create = function(req,res){
    //todo later
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in finding user in signing up');
                    return;
                }
               
                return  res.redirect('/users/sign-in');
            })
        }
        else  return res.redirect('back');
    })
}

//for creating session after signing in
module.exports.createSession=function(req,res){

}
