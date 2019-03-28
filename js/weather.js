const API_KEY = "10cde6e39e79e2d866d486a41b9845ae";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";
const weather = document.querySelector(".js-weather .weather__text");

/**
 * 날씨 정보 가져오기
 */
function getWeather(coords) {
  fetch(
    `${WEATHER_API}lat=${coords.latitude}&lon=${
      coords.longitude
    }&appid=${API_KEY}&units=metric`
  )
    .then(response => response.json())
    .then(json => {
      const name = json.name;
      const temperature = json.main.temp;
      weather.innerHTML = `${Math.floor(temperature)}° @ ${name}`;
    });
}

/**
 * 현재 위치, 날씨 정보 가져오기 성공
 */
function handleGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const coords = {
    lat,  // = lat: lat
    lng   // = lng: lng
  };
  localStorage.setItem("coords", JSON.stringify(coords));
  getWeather(coords);
}

/**
 * 현재 위치, 날씨 정보 가져오기 실패
 */
function handleGeoFailure() {
  console.log("no location");
}

/**
 * 날씨 정보 Load
 */
function loadWeather() {
  const currentCoords = localStorage.getItem("coords");
  if (currentCoords !== null) {
    const parsedCoords = JSON.parse(currentCoords);
    getWeather(parsedCoords);
  } else {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFailure);
  }
  return;
}

function init() {
  loadWeather();
}

init();