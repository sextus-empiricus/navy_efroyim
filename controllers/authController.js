const User = require('../models/userModel.js');
const {promisify} = require('util');
const sign = promisify(require('jsonwebtoken').sign);
const AppError = require('../utils/AppError.js');
const {compare} = require('bcryptjs');
const catchAsync = require('../utils/catchAsync.js');

exports.signUp = catchAsync(async (req, res) => {
    const newUser = await User.create(req.body);
    const token = await sign({id: newUser.id}, process.env.JWT_SECRETKEY, {expiresIn: process.env.JWT_EXPIRESIN})
    res.cookie('navy-efroyim-jwt', token, {
        httpOnly: true,
        maxAge: 3600000
    })
        .status(201).json({
        status: 'success',
        token,
        data: newUser
    })
})
exports.signIn = catchAsync(async (req, res, next) => {
    if (!req.body.password || !req.body.email) return next(new AppError('Check provided password or email address.', 400));
    const user = await User.findOne({email: req.body.email}).populate('password');
    const passCorrect = await compare(req.body.password, user.password);
    if (!user || !passCorrect) return next(new AppError('Wrong password or email address.', 403));
    const token = await sign({id: user.id}, process.env.JWT_SECRETKEY, {expiresIn: process.env.JWT_EXPIRESIN})
    user.password = undefined;
    res.cookie('navy-efroyim-jwt', token, {
        httpOnly: true,
        maxAge: 3600000
    })
        .status(201).json({
        status: 'success',
        token,
        data: user
    })
})
exports.logout = catchAsync(async (req, res) => {
    res.clearCookie('navy-efroyim-jwt')
        .status(201).json({
        status: 'success',
    })
});
