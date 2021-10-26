import {generateAlert, getAlertOut} from './alerts.js';

const btnLogin = document.getElementById('btn-login');

const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signIn',
            data: {
                email,
                password,
            }
        });
        if (res.data.status === 'success') {
            generateAlert(['ok'], ['h2-ok'], 'Your are logged in!');
            window.setTimeout(() => {
                location.assign('/cockpit');
            }, 1500)
        } else {
            generateAlert(['error'], ['h2-error'], 'Something went wrong.');
            getAlertOut();
        }
    } catch (err) {
        generateAlert(['error'], ['h2-error'], 'Incorrect email address or password.');
        getAlertOut();
    }
};

btnLogin.addEventListener('click', async e => {
    e.preventDefault();
    const email = (document.getElementById('input-email')).value;
    const password = (document.getElementById('input-password')).value;
    await login(email, password);
})