const User = require('../models/userModel.js');
const {promisify} = require('util');
const sign = promisify(require('jsonwebtoken').sign);
const verify = promisify(require('jsonwebtoken').verify);
const AppError = require('../utils/AppError.js');
const {compare} = require('bcryptjs');
const catchAsync = require('../utils/catchAsync.js');

exports.signUp = catchAsync(async (req, res) => {
    const newUser = await User.create(req.body);
    const token = await sign({id: newUser.id}, process.env.JWT_SECRETKEY, {expiresIn: process.env.JWT_EXPIRESIN})
    req.user = newUser;
    res.cookie('navy-efroyim-jwt', token, {
            httpOnly: true,
            maxAge: 3600000
        })
        .status(201)
        .json({
            status: 'success',
            token,
            data: newUser
        })
})
exports.signIn = catchAsync(async (req, res, next) => {
    if (!req.body.password || !req.body.email) return next(new AppError('Check provided password or email address.', 400));
    const user = await User.findOne({email: req.body.email}).populate('password');
    if (!user) return next(new AppError('Wrong password or email address.', 403));
    const passCorrect = await compare(req.body.password, user.password);
    if (!passCorrect) return next(new AppError('Wrong password or email address.', 403));
    const token = await sign({id: user.id}, process.env.JWT_SECRETKEY, {expiresIn: process.env.JWT_EXPIRESIN})
    user.password = undefined;
    req.user = user;
    res.cookie('navy-efroyim-jwt', token, {
        httpOnly: true,
        maxAge: 3600000
    })
        .status(200).json({
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
exports.protect = catchAsync(async (req, res, next) => {
    const jwtDecoded = await verify(req.cookies['navy-efroyim-jwt'], process.env.JWT_SECRETKEY);
    if (!jwtDecoded) return next(new AppError('Please login to continue.', 403))
    req.user = await User.findById(jwtDecoded.id);
    next();
})