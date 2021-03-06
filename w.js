//http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric

const API_KEY = "8f3e5fbee5cc2430c713279506c21456";
const COORDS = "coords";

const js_weather = document.querySelector(".js-weather");

function saveCoords(coords){
    localStorage.setItem(COORDS,JSON.stringify(coords));
}
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude,
    }
    saveCoords(coordsObj);
}

function handleGeoError(){
    console.log("error");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then((response) => response.json())
    .then((json)=>{
        console.log(json);
        const city = json.name;
        const temperature = json.main.temp;
        const weather_icon = json.weather[0].icon;
        js_weather.innerHTML = `
            <img class="icon" src="http://openweathermap.org/img/wn/${weather_icon}@2x.png" alt="weather">
            <div>
                <p class="temperature">${temperature}°</p>
                <p class="location">${city}</p>
            </div>
        `;

    });
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(!loadedCoords){
        askForCoords();
    }else{
        const parsedCoords = (JSON.parse(loadedCoords));
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();