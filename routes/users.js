const express = require('express');
const router = express.Router();

const usersControlller = require('../controllers/users_controller');

router.get('/profile',usersControlller.profile);
router.get('/sign-in',usersControlller.signin);
router.get('/sign-up',usersControlller.signup);

router.post('/create',usersControlller.create);

module.exports=router;