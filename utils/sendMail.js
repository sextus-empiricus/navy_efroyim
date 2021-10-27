const nodemailer = require('nodemailer');

const sendMail = async (info) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'p3awnatn@gmail.com',
            pass: '1k&fc0q&'
        }
    });
    await transporter.sendMail(info)
    }

module.exports = sendMail;