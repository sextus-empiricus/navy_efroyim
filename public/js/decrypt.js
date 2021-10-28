import {generateAlert, getAlertOut} from './alerts.js';

const btnDecrypt = document.getElementById('btn-decrypt');
const textarea = document.getElementById('textarea');


const decrypt = async password => {
    try {
        const id = (location.href).split('?id=')[1];
        const res = await axios({
            method: 'POST',
            url: `/api/v1/messages/decrypt/${id}`,
            data: {
                password,
            }
        });
        if (res.data.status === 'success') {
            generateAlert(['ok'], ['h2-ok'], 'Message decrypted!');
            getAlertOut(3000);
            textarea.textContent = res.data.data;
        } else {
            generateAlert(['error'], ['h2-error'], 'Something went wrong.');
            getAlertOut(3000);
        }
    } catch (err) {
        generateAlert(['error'], ['h2-error'], 'Wrong key-password.');
        getAlertOut(3000);
    }
}


btnDecrypt.addEventListener('click', async e => {
    e.preventDefault();
    const password = (document.getElementById('input-password')).value;
    await decrypt(password);
})

console.log(document.cookie.includes('loggedIn'));

