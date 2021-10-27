const Message = require('../models/messageModel.js');
const catchAsync = require('../utils/catchAsync.js');
const sendMail = require('../utils/sendMail.js');

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
        subject: `Hello, ${req.user.email} sent you encrypted message!`,
        text: newMessage.message,   //@TODO - create a message and logic of it
        // html: "<b>Hello world?</b>"
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