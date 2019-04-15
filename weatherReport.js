const API_KEYS = "70c94a7e21da085b361cd296c19c7837";
const COORDS_LS = "coords";
const weather = document.querySelector(".js-weather");

const handleGeoError = err => {
  console.log(err);
};

const saveToLocal = coords => {
  localStorage.setItem(COORDS_LS, JSON.stringify(coords));
};

const getWeather = (lat, lng) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEYS}&units=metric`
  )
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log(response);
      const span = document.createElement("span");
      span.innerHTML = `${response.name} ${response.main.temp}'C`;
      weather.appendChild(span);
    });
};

const handleGeoSuccess = position => {
  const {
    coords: { latitude, longitude }
  } = position;
  // const latitude = position.coords.latitude;
  // const longitude = position.coords.longitude;
  const newCoord = {
    latitude,
    longitude
  };
  saveToLocal(newCoord);
  getWeather(latitude, longitude);
};
function askForCoord() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoord() {
  const loadedCoord = localStorage.getItem(COORDS_LS);
  if (loadedCoord === null) {
    askForCoord();
  } else {
    const { latitude, longitude } = JSON.parse(loadedCoord);
    getWeather(latitude, longitude);
  }
}
function init() {
  loadCoord();
}
init();
