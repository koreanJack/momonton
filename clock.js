
const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours >= 10 ? hours : `0${hours}`}:${minutes >= 10 ? minutes : `0${minutes}`}`;
    // seconds < 10 ? `0${seconds}` : seconds가 더 좋은 표현임
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();
