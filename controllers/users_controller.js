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
module.exports.signup = function(req,res){
    //todo later
}
