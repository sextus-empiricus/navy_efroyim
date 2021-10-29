const Message = require('../models/messageModel.js');
const catchAsync = require('../utils/catchAsync.js');
const sendMail = require('../utils/sendMail.js');
const {decryptText} = require('../utils/cipher.js');
const {promisify} = require('util');
const verify = promisify(require('jsonwebtoken').verify);

exports.createMessage = catchAsync(async (req, res) => {
    const newMessage = await Message.create({
        title: req.body.title,
        to: req.body.to,
        password: req.body.password,
        message: req.body.message,
        user: req.user.id || req.body.user
    });

    const mailData = {
        from: req.user.email,
        to: req.body.to,
        subject: `Hello! ${req.user.email} sent you encrypted message!`,
        text: `Hello you!\n${req.user.email} sent you an encrypted message.\nFor a security reasons he will pass you a secret key (it\'s necessary to decrypt the message) in other way (e.g. by SMS).\nYou can decrypt the message using this key by the page: https://test1239rigi4.herokuapp.com/decrypt?id=${newMessage.id}\nHave nice day!`
    };
    await sendMail(mailData);

    res.status(201).json({
        status: 'success',
        data: newMessage
    })
});
exports.getAllMessages = catchAsync(async (req, res) => {
    const messages = await Message.find();
    res.status(201).json({
        status: 'success',
        results: messages.length,
        data: messages
    })
});
exports.getMessage = catchAsync(async (req, res) => {
    const message = await Message.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: message
    })
});
exports.updateMessage = catchAsync(async (req, res) => {
    const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({
        status: 'success',
        data: updatedMessage
    })
});
exports.deleteMessage = catchAsync(async (req, res) => {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success',
        data: deletedMessage
    })
});

exports.decryptMessage = catchAsync(async (req, res) => {
    const message = await Message.findById(req.params.id);
    const decryptedMessage = await decryptText(message.message, req.body.password, process.env.CRYPTO_SALT, message.iv)
    const jwtDecoded = req.cookies['navy-efroyim-jwt'] ? await verify(req.cookies['navy-efroyim-jwt'], process.env.JWT_SECRETKEY) : '';
    const messageUserId = ((message.user).toString());
    if (jwtDecoded.id !== messageUserId) await Message.findByIdAndUpdate(req.params.id, {decryptedAt: new Date()});
    res.status(200).json({
        status: 'success',
        data: decryptedMessage
    })
});
