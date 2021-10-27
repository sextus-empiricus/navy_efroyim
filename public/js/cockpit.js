const btnLogout = document.getElementById('btn-logout');
const btnShow = document.getElementById('btn-show');
const btnSend = document.getElementById('btn-send');
import {generateAlert} from './alerts.js';

const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/logout',
        });
        if (res.data.status === 'success') {
            generateAlert(['ok'], ['h2-ok'], 'Hope to see you soon!');
            window.setTimeout(() => {
                location.assign('/');
            }, 2000)
        } else {
            generateAlert(['error'], ['h2-error'], 'Something went wrong.');
        }
    } catch (err) {
        generateAlert(['error'], ['h2-error'], 'Something went wrong.');
    }
}

btnLogout.addEventListener('click', async () => {
    await logout();
})

btnSend.addEventListener('click',  () => {
    location.assign('/message')
})

btnShow.addEventListener('click', ()=>{
    location.assign('/messages')
})