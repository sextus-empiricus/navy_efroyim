const btnGetStarted = document.getElementById('btn-get-started');


btnGetStarted.addEventListener('click', e => {
    e.preventDefault();
    window.location = '/register'
})