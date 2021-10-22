const express = require('express');
const messagesController = require('../controllers/messagesController.js');

const router = express.Router();

router.route('/')
    .get(messagesController.getAllMessages)
    .post(messagesController.createMessage)

router.route('/:id')
    .get(messagesController.getMessage)
    .patch(messagesController.updateMessage)
    .delete(messagesController.deleteMessage)

module.exports = router;