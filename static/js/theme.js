const themeEl = document.querySelector('#theme');
const r = document.querySelector(':root');
var rs = getComputedStyle(r);

fetch("/session")
    .then(response => response.json())
    .then(session => {
        if (session.theme == 'dark') {
            dark();
        }
        else {
            light();
        }
    });

themeEl.addEventListener('click', () => {
    if (rs.getPropertyValue('--bg-primary') == '#ebedef') {
        dark();
        fetch('/preferences?theme=dark');
    }
    else {
        light()
        fetch('/preferences?theme=light');
    }
});

function light() {
    r.style.setProperty('--text-primary', '#0e0e0e');
    r.style.setProperty('--bg-primary', '#ebedef');
    r.style.setProperty('--bg-primary-2', '#fefefe');
    r.style.setProperty('--bg-primary-3', '#cecece');
}

function dark() {
    r.style.setProperty('--text-primary', '#ebedef');
    r.style.setProperty('--bg-primary', 'rgb(22,23,28)');
    r.style.setProperty('--bg-primary-2', '#0e0e0e');
    r.style.setProperty('--bg-primary-3', '#1e1e1e');
}

