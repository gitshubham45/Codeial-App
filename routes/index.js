const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/',homeController.home);
//only upper controller used
// router.get('/',homeController.actionName);

// router.get('/',homeController.go);

module.exports = router;