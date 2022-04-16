
const User=require('../models/user');
const fs=require('fs');
const path=require('path');

//profile page

module.exports.profile = function(req, res){

    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user
        });
    })

    
}

module.exports.update = async function(req,res){
    // if(req.user.id==req.params.id){
    //    // User.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email})
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    //     });
    // }
    // else {
    //     return res.status(401).send('Unauthorized');
    // }
    
    if(req.user.id==req.params.id){
        try {
           
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('****Multer Error :',err);
                }
                
               
                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                    }

                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar=User.avatarPath + '/'+ req.file.filename;
                   
                }
                user.save();
                return res.redirect('back');  
            })
        } catch (err) {
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','Unauthorized')
        return res.status(401).send('Unauthorized');
    }

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
    req.flash('success','Logged in succesfully');

    return res.redirect('/');
    //return res.redirect("/users/profile/"+req.user.id)
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
    req.flash('success','You have logged out');
   
    return res.redirect('/');
}

