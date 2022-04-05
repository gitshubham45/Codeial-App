const Post = require('../models/post');



module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"Codial | Home",
    //         posts:posts
    //     });
    // });

    //Polpulate the user of each post
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title:"Codial | Home",
            posts:posts
        });
    })
    
}

// module.exports.actionName=function(req,res){
//     return res.end('<h1>Module used</h1>')
// }

// module.exports.go=function(req,res){
//     return res.end('<h1>go controller used</h1>')
// }