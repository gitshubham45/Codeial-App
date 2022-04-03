
const User=require('../models/user')

//profile page

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}
// module.exports.profile = function(req,res){
//     if(req.cookies.user_id){
//         User.findById(req.cookies.user_id,function(err,user){
//             if(user){
//                 return res.render('user_profile',{
//                     title:'User Profile',
//                     user:user
//                 })
//             }
//             return res.redirect('/users/sign-in');
//         });
//     }
//     else{
//         return res.redirect('/users/sign-in');
//     }
    
// }

// module.exports.profile=function(req,res){
//     // res.end('<h1>profile use</h1>');
//     User.findById(req.params.id,function(err,user){
//     return res.render('user_profile',{
//         title: "User | Profile",
//         profile_user: user
        
//        // content: "Codeial | User Profile"
//     });

//  }); 
// }


//for sign
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
       return  res.redirect('/users/profile')
    }
    res.render('signin_page',{
        title:"codial | Sign In"
    })
}


//for sign-up
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
       return  res.redirect('/users/profile')
    }
    res.render('signup_page',{
        title:"codial | Sign Up"
    })
}

//for craeting profile
module.exports.create = function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        //if user not found then create new user
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in finding user in signing up');
                    return;
                }
               
                return  res.redirect('/users/sign-in');
            })
        }
        //return to the sign up page
        else  return res.redirect('back');
    })
}

//for creating session
module.exports.createSession=function(req,res){
    return res.redirect('/users/profile');
}

//for creating session after signing in
// module.exports.createSession=function(req,res){
    
//     //steps to authenticate
//     //find the user
//     User.findOne({email:req.body.email},function(err,user){
//         if(err){
//             console.log('error in finding user in signing in');
//             return;
//         }
//         //handle user found
//         if(user){
    
//             //handle password which dont't match
//             if(user.password!=req.body.password){
//                 return res.redirect('back');
//             }
//             //handle session creation
//             res.cookie('user_id',user.id);
//             return res.redirect('/users/profile');
//         }
//         //handle user not found
//         else return res.redirect('back');
//     })

    
// }

//signing out 
// module.exports.signout= function(req,res){

//     if(err){
//         console.log('error in finding user in signing in');
//         return;
//     }
    
//     return res.redirect('/users/sign-in')
// }

//creatinig controller for signing out
module.exports.destroySession = function(req,res){
    req.logout();
   
    return res.redirect('/');
}

