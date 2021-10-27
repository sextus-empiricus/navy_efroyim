import {getCookie} from './getCookie.js';
import {generateAlert, getAlertOut} from './alerts.js';

const btnDecrypt = document.getElementById('btn-decrypt');
const textarea = document.getElementById('textarea');

const decrypt = async password => {
    try {
        const id = getCookie('msgId');
        const res = await axios({
            method: 'POST',
            url: '/api/v1/messages/decrypt',
            data: {
                id,
                password,
            }
        });
        if (res.data.status === 'success') {
            generateAlert(['ok'], ['h2-ok'], 'Message decrypted!');
            getAlertOut(3000);
            textarea.textContent = res.data.data; //@TODO - tu przy pojawianiu się content-u ma być efekt maszyny do pisania;
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

