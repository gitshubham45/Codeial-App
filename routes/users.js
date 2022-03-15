const express = require('express');
const router = express.Router();

const usersControlller = require('../controllers/users_controller');

router.get('/profile',usersControlller.profile);

module.exports=router;