import {generateAlert, getAlertOut} from './alerts.js';

const btnSend = document.getElementById('btn-send');
const inputPassword = document.getElementById('input-password');


const sendMessage = async (title, to, password, message) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/messages',
            data: {
                title,
                to,
                password,
                message,
            }
        });
        if (res.data.status === 'success') {
            document.cookie = `recipient=${to}`
        }
        location.assign('/thankyou');
    } catch (err) {
        if (err.response.data.message.includes('email address')) {
            generateAlert(['error'], ['h2-error'], 'Please verify if recipient\'s email address is correct.');
            getAlertOut(4000);
        } else if (err.response.data.message.includes('message content')) {
            generateAlert(['error'], ['h2-error'], 'Please provide your message content.');
            getAlertOut(4000);
        } else if (err.response.data.message.includes('password')) {
            generateAlert(['error'], ['h2-error'], 'Please provide your password necessary to decrypt a message.');
            getAlertOut(4000);
        }
    }
};

btnSend.addEventListener('click', async e => {
    e.preventDefault();
    const title = (document.getElementById('input-title')).value;
    const to = (document.getElementById('input-email')).value;
    const password = (document.getElementById('input-password')).value;
    const message = (document.getElementById('textarea')).value;

    await sendMessage(title, to, password, message);
})
inputPassword.addEventListener('focus', () => {
    generateAlert(['warning'], ['h2-warning'], 'This key won\'t be saved in database. Make sure to remember it.');
    getAlertOut(3000)
})