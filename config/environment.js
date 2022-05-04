

const development = {
    name: 'development',
    asset_path : './assets',
    session_cookie_key:'blahsomething',
    db:'codial_development',
    smtp: {
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'codial.development.project@gmail.com',
            pass:'eyzpbgabtrexnbbv'
        }
    },
    google_client_id:"764611250446-h0b5ld68utb06uib1i0lkmmdd933mf5m.apps.googleusercontent.com",
    google_client_secret:"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",
    google_call_back_url:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codial',
}

const production = {
    name:'production',

}

module.exports = development;