const btnDelete = [...document.querySelectorAll('.btn-msg-delete')];
import {generateAlert, getAlertOut} from './alerts.js';

const h1 = document.getElementById('h1-messages')
const h2 = document.getElementById('h2-messages')



const hideElements = (...el) => {
    el.forEach(el => {
        el.classList.add('fade-out')
    })
}

const deleteMessage = async (id, el) => {
    const card = ((el.parentNode).parentNode);
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/messages/${id}`,
        });
        generateAlert(['ok'], ['h2-ok'], 'Message successfully deleted.');
        hideElements(card, h1, h2);
        window.setTimeout(() => {
            location.assign('/messages');
        }, 2500)
    } catch (err) {
        generateAlert(['error'], ['h2-error'], 'Something get wrong.');
        getAlertOut();
    }
};

btnDelete.forEach(el => {
    el.addEventListener('click', async () => {
        const id = el.dataset.id;
        await deleteMessage(id, el);
    })
})
