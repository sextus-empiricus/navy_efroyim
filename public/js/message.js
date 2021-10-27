const btnSend = document.getElementById('btn-send');


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
        console.log(err.response.data)

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