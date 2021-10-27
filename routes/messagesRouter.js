const express = require('express');
const messagesController = require('../controllers/messagesController.js');
const authController = require('../controllers/authController.js');

const router = express.Router();

router.route('/')
    .get(messagesController.getAllMessages)
    .post(authController.protect, messagesController.createMessage)

router.route('/:id')
    .get(messagesController.getMessage)
    .patch(messagesController.updateMessage)
    .delete(messagesController.deleteMessage)

module.exports = router;