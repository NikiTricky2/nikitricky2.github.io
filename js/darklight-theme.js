if (!document.cookie.includes("theme")) {
    document.cookie = "theme=dark";
}

const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('theme='))
    .split('=')[1];

const a = document.querySelector("#theme-style-container");

if (cookieValue == 'dark') {
    a.innerHTML = '<link rel="stylesheet" href="/css/bootstrap_dark.min.css">\n<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/atom-one-dark.min.css">';
    document.getElementById("themebutton").innerHTML = "<i class='fa-solid fa-sun'></i>"
    document.getElementById("themebutton").addEventListener("click", setThemeLight);
} else if (cookieValue == 'light') {
    a.innerHTML = '<link rel="stylesheet" href="/css/bootstrap_light.min.css">\n<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/atom-one-light.min.css">';
    document.getElementById("themebutton").innerHTML = "<i class='fa-solid fa-moon'></i>"
    document.getElementById("themebutton").addEventListener("click", setThemeDark);
}

function setThemeLight() {
    document.cookie = "theme=light";
    location.reload();
}

function setThemeDark() {
    document.cookie = "theme=dark";
    location.reload();
}