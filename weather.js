
const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "8c4ed3411fa8d218c9702ba2c4606b5e";


function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function (responese) {
        return responese.json();
    }).then(function (json) {
        const temperature = json.main.temp;
        const location = json.name;
        weather.innerText = `${temperature}:${location}`;
    })
}

function saveCoords(locationObj) {
    localStorage.setItem(COORDS, JSON.stringify(locationObj));
}

function geoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const locationObj = {
        latitude,
        longitude
    }
    saveCoords(locationObj);
    getWeather(latitude, longitude);
}

function geoError() {
    console.log(`Cant access location`)
}

function askCoords() {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askCoords();
    } else {
        const paredCoords = JSON.parse(loadedCoords);
        getWeather(paredCoords.latitude, paredCoords.longitude);
    }
}

function init() {
    loadCoords();
}
init();