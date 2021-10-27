const viewController = require('../controllers/viewController.js');
const authController = require('../controllers/authController.js');

const express = require('express');

const router = express.Router();

router
    .get('/', viewController.home)
    .get('/register', viewController.register)
    .get('/login', viewController.login)
    .get('/message', authController.protect, viewController.message)
    .get('/thankyou', viewController.thankyou)
    .get('/cockpit', authController.protect, viewController.cockpit)
    .get('/messages', authController.protect, viewController.messages)
    .get('/decrypt', viewController.decrypt)

module.exports = router;