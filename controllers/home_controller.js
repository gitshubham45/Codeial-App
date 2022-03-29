module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie('user_id',25);
    return res.render('home',{
        title:"Home"
    });
}

// module.exports.actionName=function(req,res){
//     return res.end('<h1>Module used</h1>')
// }

// module.exports.go=function(req,res){
//     return res.end('<h1>go controller used</h1>')
// }