const User = require('../models/userModel.js');
const catchAsync = require('../utils/catchAsync.js');

exports.createUser = catchAsync(async (req, res) => {
    const newUser = await User.create(req.body);
    res.status(201).json({
        status: 'success',
        data: newUser
    })
});
exports.getUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: user
    })
});
exports.getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: users
    })
});
exports.updateUser = catchAsync(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({
        status: 'success',
        data: updatedUser
    })
});
exports.deleteUser = catchAsync(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success',
        data: deletedUser
    })
});