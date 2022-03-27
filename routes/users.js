const express = require('express');
const router = express.Router();

const usersControlller = require('../controllers/users_controller');

router.get('/profile',usersControlller.profile);
router.get('/sign-in',usersControlller.signin);
router.get('/sign-up',usersControlller.signup);

module.exports=router;