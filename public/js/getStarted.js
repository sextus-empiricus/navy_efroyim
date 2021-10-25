const btnGetStarted = document.getElementById('btn-get-started');

if (btnGetStarted) {
    btnGetStarted.addEventListener('click', e => {
        e.preventDefault();
        window.location = '/register'
    })
}