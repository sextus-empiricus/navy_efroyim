const User = require('../models/userModel.js');

exports.createUser = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newUser
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
};
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.errors
        })
    }
};
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: users
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.errors
        })
    }
};
exports.updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({
            status: 'success',
            data: updatedUser
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.errors
        })
    }
};
exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: deletedUser
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.errors
        })
    }
}