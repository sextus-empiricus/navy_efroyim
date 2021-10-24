const mongoose = require('mongoose');
const validator = require('validator');
const {encryptText} = require('../utils/cipher.js')

const messageSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, 'Please title your message.'],
    },
    to: {
        type: String,
        validate: [validator.isEmail, 'Please verify if recipient\'s email address is correct.'],
        required: [true, 'Please provide an email address of message recipient.']
    },
    message: {
        type: String,
        required: [true, 'Please provide your message content.'],
    },
    iv: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Please provide your password necessary to decrypt a message.'],
    },
    decryptedAt: {
        type: Date,
        default: undefined
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Message have to belong to particular user.']
    },
    sentAt: {
        type: Date,
        default: new Date()
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

messageSchema.pre('save', async function (next) {
    const obj = await encryptText(this.message, this.password, process.env.CRYPTO_SALT);
    this.message = obj.encrypted;
    this.iv = obj.iv;
    this.password = undefined;
    next();
})


const messageModel = mongoose.model('Message', messageSchema);

module.exports = messageModel;