const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

// router.post('/signUp', userController.signUp);

router.route('/').post(userController.createUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;