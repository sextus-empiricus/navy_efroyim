const User = require('../models/userModel.js');

exports.signUp = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newUser
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