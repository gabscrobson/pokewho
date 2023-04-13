const usernameEl = document.querySelector('#username');
const passwordEl = document.querySelector('#password');
const confirmEl = document.querySelector('#confirmation');

// Justify content to center
document.querySelector('main').style.justifyContent = "center";

usernameEl.addEventListener('input', () => {
    let username = usernameEl.value;
    let regex = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){5,20}[a-zA-Z0-9]$/;

    if (regex.test(username))
        usernameEl.style.border = '1px solid var(--bg-primary-3)';
    else if (username.length > 6)
        usernameEl.style.border = '1px solid #dd0000';
    
});

passwordEl.addEventListener('input', () => {
    let password = passwordEl.value;
    let regex = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){5,20}[a-zA-Z0-9]$/;

    if (regex.test(password))
        passwordEl.style.border = '1px solid var(--bg-primary-3)';
    else if (password.length > 6)
        passwordEl.style.border = '1px solid #dd0000';
});

confirmEl.addEventListener('input', () => {
    let password = passwordEl.value;
    let confirm = confirmEl.value;

    if (password === confirm) {
        passwordEl.style.border = '1px solid var(--bg-primary-3)';
        confirmEl.style.border = '1px solid var(--bg-primary-3)';
    }
    else if (confirm.length > 6) {
        passwordEl.style.border = '1px solid #dd0000';
        confirmEl.style.border = '1px solid #dd0000';
    }
});