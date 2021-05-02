const weather = document.querySelector(".js-weather");
const API_KEY ="8c59231102e5dd5bb67d068afd35331c";

function getWeather(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}° 
        @ ${place}`
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem("coords", JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function hadleGeoError(){
    console.log("can t access");
}

function askForCoord() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, hadleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem("coords");
    if(loadedCoords === null) {
        askForCoord();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();