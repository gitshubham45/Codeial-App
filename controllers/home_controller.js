
const Post = require('../models/post');
const User = require('../models/user');



module.exports.home = async function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id',25);

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"Codial | Home",
    //         posts:posts
    //     });
    // });

    try {
         // populate the user of each post
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user likes'
                }
                // populate:{
                //     path:'likes'
                // }
        })
        .populate('likes')

        for(let post of posts){
            console.log('hello')
            for(let comment of post.comments){
                console.log(comment);
            }
        }
        //console.log(posts);

        let users = await User.find({});


        return res.render('home', {
            title: "Codial | Home",
            posts: posts,
            all_users: users
        });
    } catch(err) {
        console.log('Error', err);
        return;
    }

    //Polpulate the user of each post

    // .exec(function(err,posts){

    //     User.find({},function(err,users){

    //     });


    // })

}

// module.exports.actionName=function(req,res){
//     return res.end('<h1>Module used</h1>')
// }

// module.exports.go=function(req,res){
//     return res.end('<h1>go controller used</h1>')
// }
