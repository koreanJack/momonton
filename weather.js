
const weather = document.querySelector(".js-weather");

const COORDS = "coords"; 
const API_KEY = "8c4ed3411fa8d218c9702ba2c4606b5e";

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
        .then(function (response) {
            return response.json(); 
        })
        .then(function (json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} : ${place}`;
    })  
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
};  

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(error) {
    console.log(`Can't access geo location`);
}

function askForCoords() {
     navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError) 
}


function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
} 
 
function init() {
    loadCoords() ;
}

init();