const express = require('express');
const router = express.Router();

const passport = require('passport');

const usersControlller = require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication, usersControlller.profile);
router.get('/sign-in',usersControlller.signin);
router.get('/sign-up',usersControlller.signup);

router.post('/create',usersControlller.create);
router.post('/create-session',usersControlller.createSession);
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},

),usersControlller.createSession)
router.post('/sign-out',usersControlller.signout);
module.exports=router;