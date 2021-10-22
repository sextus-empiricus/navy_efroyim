const mongoose = require('mongoose');
const validator = require('validator');
const {hash} = require('bcryptjs');

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
        },
        createdAt: {
            type: Date,
            default: new Date()
        }
    },
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

userSchema.virtual('messages', {
    ref: 'Message',
    foreignField: 'user',
    localField: '_id'
})

userSchema.pre(/^find/, function (next) {
    this.populate('messages');
    next();
})


userSchema.pre('save', async function (next) {
    this.password = await hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;