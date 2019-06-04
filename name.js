const form = document.querySelector(".js-name"),
    input = form.querySelector("input"),
    hello = document.querySelector(".js-hello")

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(name) {
    localStorage.setItem(USER_LS, name);
}


function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintName(currentValue);
    saveName(currentValue);
}


function askName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintName(text) {
    form.classList.remove(SHOWING_CN)
    hello.classList.add(SHOWING_CN);
    hello.innerText = `Hello ${text}`;

}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askName();
    } else {
        paintName(currentUser);
    }
}

function init() {
    loadName();
}

init();