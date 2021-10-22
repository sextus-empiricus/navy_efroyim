const mongoose = require('mongoose');
const validator = require('validator');

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

    key: {
        type: String
    },
    decryptedAt: {
        type: Date,
        default: undefined
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Message have to belong to particular user.']
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

const messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;