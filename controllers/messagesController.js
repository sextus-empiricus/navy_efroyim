const Message = require('../models/messageModel.js');

exports.createMessage = async (req, res, next) => {
    try {
        const newMessage = await Message.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newMessage
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            data: err.errors
        })
    }
}
exports.getAllMessages = async (req, res, next) => {
    try {
        const messages = await Message.find();
        res.status(201).json({
            status: 'success',
            results: messages.length,
            data: messages
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            data: err.errors
        })
    }
}
exports.getMessage = async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: message
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            data: err.errors
        })
    }
}
exports.updateMessage = async (req, res, next) => {
    try {
        const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({
            status: 'success',
            data: updatedMessage
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            data: err.errors
        })
    }
}
exports.deleteMessage = async (req, res, next) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: deletedMessage
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.errors
        })
    }
}