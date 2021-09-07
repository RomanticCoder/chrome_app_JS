const API_KEY = "8f3e5fbee5cc2430c713279506c21456";
const COORDS = 'coords';

const weather = document.querySelector(".js-weather");

function getWeather(lat,lon){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then((response)=> response.json())
    .then((json) =>{
        const temperature = json.main.temp;
        const city = json.name;
        weather.innerText =  `${temperature},${city}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coords =  {
        latitude,
        longitude,
    }
    saveCoords(coords);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("can't access geo location");
}
function askForCoords(){
   navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError); 
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(!loadedCoords){
        askForCoords();

    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);

    }
}

function init(){
    loadCoords();
}

init();