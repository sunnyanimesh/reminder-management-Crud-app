var express = require('express');
var router = express.Router();
var user_controller  = require('../controllers/user_controller');
var reminder_controller = require('../controllers/reminder_controller');

router.get('/allUsers',user_controller.allUsers);
router.get('/user',user_controller.user);
router.post('/newUser',user_controller.newUser);

router.get('/allReminders',reminder_controller.allReminders);
router.post('/addReminder',reminder_controller.addReminder);
router.put('/updateReminder/:id',reminder_controller.updateReminder);
router.delete('/deleteReminder/:id',reminder_controller.deleteReminder);
router.get('/remindersByUser/:id',reminder_controller.remindersByUser);
router.get('/reminderById/:id',reminder_controller.reminderById);
module.exports = router;
