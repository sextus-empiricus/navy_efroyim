const viewController = require('../controllers/viewController.js');

const express = require('express');

const router = express.Router();

router
    .get('/', viewController.home)
    .get('/register', viewController.register)
    .get('/login', viewController.login)
    .get('/message', viewController.message)
    .get('/thankyou', viewController.thankyou)

module.exports = router;