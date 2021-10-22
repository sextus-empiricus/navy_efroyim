const Message = require('../models/messageModel.js');
const catchAsync = require('../utils/catchAsync.js');

exports.createMessage = catchAsync(async (req, res) => {
    const newMessage = await Message.create(req.body);
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