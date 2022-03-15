const express = require('express');

const router = express.Router();

const postController = require('../controllers/post_controllers');
router.get('/post_it',postController.post);

module.exports=router;

