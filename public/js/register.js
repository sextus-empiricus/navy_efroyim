const btnRegister = document.getElementById('btn-register');


const signUp = async(email, password, passwordConfirm) => {
    try{
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
            location.assign('/message');
        }

    } catch (err) {
        // console.log(err.response.data);
        if(err.response.data.message.includes('E11000')) {
            console.log('Email address already in use.')
        } else {
            console.log('Please check your password.')
        }
    }
};

if (btnRegister) {
    btnRegister.addEventListener('click', async e => {
        e.preventDefault();
        const email = (document.getElementById('input-email')).value;
        const password = (document.getElementById('input-password')).value;
        const passwordConfirm = (document.getElementById('input-passwordConfirm')).value;
        await signUp(email, password, passwordConfirm);
    })
}