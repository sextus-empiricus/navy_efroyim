const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide your email address.'],
        validate: [validator.isEmail, 'Please verify if your email address is correct.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password.'],
        minlength: [4, 'The password must be at least four characters long.'],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: true,
        minlength: 4,
        select: false,
        validate: {
            validator: function () {
                return this.passwordConfirm === this.password;
            },
            message: 'Passwords are not the same.'
        }
    }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;