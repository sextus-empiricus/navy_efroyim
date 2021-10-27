export function getAlertOut(timeout) {
    window.setTimeout(() => {
        const currentAlert = document.getElementById('alert');
        currentAlert.classList.add('get-out');
    }, timeout);
}

export function generateAlert(divClasses, h2Classes, content) {
    const body = document.querySelector('body');
    const currentAlert = document.getElementById('alert');
    if (currentAlert) body.removeChild(currentAlert);

    const div = document.createElement('div');
    div.classList.add('wrapper');
    divClasses.forEach(el => {
        div.classList.add(el);
    })
    div.id = 'alert';
    const h2 = document.createElement('h2');
    h2Classes.forEach(el => {
        h2.classList.add(el);
    })
    h2.classList.add('h2-error');
    h2.textContent = content;

    div.appendChild(h2);
    body.append(div);
}