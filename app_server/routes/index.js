var express = require('express');
var router = express.Router();
var controller = require('../controllers/main_controller');

router.get('/', controller.index);
router.get('/login',controller.login);
router.get('/dashboard',controller.validateuser,controller.dashboard);
router.get('/logout',controller.logout);
module.exports = router;
