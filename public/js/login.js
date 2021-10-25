import {generateWindow, getWindowOut} from './alerts.js';

const btnLogin = document.getElementById('btn-login');

const login = async (email, password) => {
    console.log(email, password)
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
            generateWindow(['ok'], ['h2-ok'], 'Your are logged in!');
            window.setTimeout(() => {
                location.assign('/message');
            }, 1500)
        } else {
            generateWindow(['error'], ['h2-error'], 'Something went wrong.');
            getWindowOut();
        }
    } catch (err) {
        generateWindow(['error'], ['h2-error'], 'Incorrect email address or password.');
        getWindowOut();
    }
};

btnLogin.addEventListener('click', async e => {
    e.preventDefault();
    const email = (document.getElementById('input-email')).value;
    const password = (document.getElementById('input-password')).value;
    await login(email, password);
})