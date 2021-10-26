import {generateAlert, getAlertOut} from './alerts.js';
const btnRegister = document.getElementById('btn-register');

const signUp = async (email, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signUp',
            data: {
                email,
                password,
                passwordConfirm
            }
        });
        if (res.data.status === 'success') {
            generateAlert(['ok'], ['h2-ok'], 'Thank you for a registration!');
            window.setTimeout(() => {
                location.assign('/message');
            }, 1500)
        } else {
            generateAlert(['error'], ['h2-error'], 'Something went wrong.');
            getAlertOut();
        }

    } catch (err) {
        if (err.response.data.message.includes('E11000')) {
            generateAlert(['error'], ['h2-error'], 'Email address already in use.');
            getAlertOut();
        } else if (err.response.data.message.includes('User validation failed: email')) {
            generateAlert(['error'], ['h2-error'], 'Please verify if your email address is correct.');
            getAlertOut();
        } else if (err.response.data.message.includes('Passwords are not the same.')) {
            generateAlert(['error'], ['h2-error'], 'Passwords are not the same.');
            getAlertOut();
        } else if (err.response.data.message.includes('The password must be at least four characters')) {
            generateAlert(['error'], ['h2-error'], 'The password must be at least four characters.');
            getAlertOut();
        } else {
            generateAlert(['error'], ['h2-error'], 'Something went wrong. Please check provided data.');
            getAlertOut();
        }
    }
};

btnRegister.addEventListener('click', async e => {
    e.preventDefault();
    const email = (document.getElementById('input-email')).value;
    const password = (document.getElementById('input-password')).value;
    const passwordConfirm = (document.getElementById('input-passwordConfirm')).value;
    await signUp(email, password, passwordConfirm);
})
