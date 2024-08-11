const APIKey = "186701236420f7c8f20e38540fe0667c";
const currentDate = document.querySelector("#current-day");
const wheatherTemp = document.querySelector("#w-temp-data");
const cityNameData = document.querySelector("#city-name-data");
const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#search-btn");
const realFeel = document.querySelector("#real-feel");
const chanceRain = document.querySelector("#chance-rain");
const windData = document.querySelector("#wind-data");
const humidityData = document.querySelector("#humidity-data");
const wConditionImg = document.querySelector(".w-condition-img");
const wIconsData = document.querySelector("#w-icons-data");
const iconsNameD1 = document.querySelector("#icons-name-d1");
const visibilityData = document.querySelector("#visibility-data");
const mapPage = document.querySelector("#map-page");
const getMapBtn = document.querySelector("#get-map-btn");
const openMap = document.querySelector("#open-map");
const closeMap = document.querySelector("#close-map");

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// ----------------------------------current date and time-start----------------------------------------------------

function myDay() {
  let date = new Date();
  let newDate = date.toLocaleString([], { hour12: true });
  currentDate.innerHTML = newDate;
}
myDay();
// ----------------------------------current date and time-End-----------------------------------------------------

const unit = "metric";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?&units=${unit}&q=`;

// ================== Map Page javascript code start =========================================================
mapPage.addEventListener("click", (mapData) => {
  openMap.style.display = "flex";
});
closeMap.addEventListener("click", () => {
  openMap.style.display = "none";
});

// ================== Map Page javascript code end =========================================================

// ================== Search by city namr function ===========================================================
async function myWheatherData(city) {
  try {
    const response = await fetch(`${apiURL}${city}&appid=${APIKey}`);

    if (response.status == 404) {
      window.alert("No city found");
    } else {
      var data = await response.json();
      updateWeatherData(data);
      saveData(city);
      searchInput.value = "";
    }
  } catch (error) {
    console.log(error);
  }
}

function updateWeatherData(data) {
  cityNameData.innerHTML = data.name + " " + data.sys.country + ".";
  wheatherTemp.innerHTML = Math.round(data.main.temp) + "°C";
  realFeel.innerHTML = Math.round(data.main.feels_like) + "°C";
  chanceRain.innerHTML = data.weather[0].description;
  windData.innerHTML = Math.round(data.wind.speed) + "Km/h";
  humidityData.innerHTML = Math.round(data.main.humidity) + "%";
  let icon = data.weather[0].icon;
  let showIcon = getIcons(icon);
  const imgElement = `<img src="./img/${showIcon}" alt="weather-img">`;
  wConditionImg.innerHTML = imgElement;
  const wIconsElement = `<img src="./img/${showIcon}" alt="weather-img">`;
  wIconsData.innerHTML = wIconsElement;
  iconsNameD1.innerHTML = data.weather[0].description;
  visibilityData.innerHTML = Math.round(data.visibility / 1000) + " km/h";
}

function saveData(city) {
  localStorage.setItem("cityName", city);
}

searchBtn.addEventListener("click", () => {
  const city = searchInput.value;
  myWheatherData(city);
});

window.addEventListener("load", () => {
  const defaultCityName = "Gurgaon";
  const getCityName = localStorage.getItem("cityName") || defaultCityName;
  if (getCityName) {
    myWheatherData(getCityName);
  }
});

function getIcons(icon) {
  const showImages = {
    "01d": "clear-day.png",
    "01n": "clear-night.png",
    "02d": "day-few-cloud.png",
    "02n": "cloudy-night-02n.png",
    "03d": "scattled-cloud.png",
    "03n": "scattled-cloud.png",
    "04n": "broken-cloud.png",
    "04d": "broken-cloud.png",
    "09d": "slower-rain.png",
    "09n": "shower rain night.png",
    "10d": "w-rain.png",
    "10n": "rainy10n.png",
    "11n": "thunderstorm.png",
    "11d": "thunderstorm.png",
    "13n": "snowy.png",
    "13d": "snowy.png",
    "50d": "mist.png",
    "50n": "mist.png",
  };
  return showImages[icon] || "rainy_weather.png";
}

// ================== Search by city current geo locatiom function ========================================
const APIKey_1 = "b77cbbb4b14541f5afd145137241008";
const foreDastDays = 7;
const AQI = "yes";
const apiURLGeographical = `http://api.weatherapi.com/v1/forecast.json?key=${APIKey_1}&aqi=${AQI}&days=${foreDastDays}&q=
`;
async function myWheatherDataByCoords(lat, lon) {
  try {
    const response1 = await fetch(`${apiURLGeographical}${lat},${lon}`);
    console.log(response1);
    if (response1.ok) {
      var mapData = await response1.json();
      console.log(mapData);
      mapDataDisplay(mapData);
      saveMapData(lat, lon);
    } else {
      window.alert("Unable to fetch your location");
    }
  } catch (error) {
    console.log(error);
  }
}

function mapDataDisplay(mapData) {
  const pAllElement = document.querySelectorAll(".sevev-days-name");
  const savenDaysIcons = document.querySelectorAll(".saven-days-icons");
  const savenDaysWeather = document.querySelectorAll(".seven-days-weather");
  const sevenDaysTMan = document.querySelectorAll(".seven-days-t-man");
  const sevenDaysTMin = document.querySelectorAll(".seven-days-t-min");
  for (let i = 0; i < 7; i++) {
    const dateStr = mapData.forecast.forecastday[i].date;
    const dateObj = new Date(dateStr);
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    pAllElement[i].textContent = dayName;
  }
  for (let i = 0; i < 7; i++) {
    savenDaysIcons[
      i
    ].src = `${mapData.forecast.forecastday[i].day.condition.icon}`;
    savenDaysWeather[
      i
    ].innerHTML = `${mapData.forecast.forecastday[i].day.condition.text}`;
    sevenDaysTMan[i].innerHTML = Math.round(
      `${mapData.forecast.forecastday[i].day.maxtemp_c}`
    );

    sevenDaysTMin[i].innerHTML = Math.round(
      `${mapData.forecast.forecastday[i].day.mintemp_c}`
    );
  }
}

getMapBtn.addEventListener("click", () => {
  const getLocation = navigator.geolocation;
  if (getLocation) {
    getLocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        myWheatherDataByCoords(lat, lon);
        openMap.style.display = "none";
      },
      () => {
        window.alert("Unable to fetch your location");
      }
    );
  } else {
    window.alert("Geolocation is not supported by this browser.");
  }
});

function saveMapData(lat, lon) {
  localStorage.setItem("latlon", [lat, lon]);
}
window.addEventListener("load", () => {
  const loadMapData = parseInt(localStorage.getItem("latlon"));
  if (loadMapData) {
    myWheatherDataByCoords(loadMapData);
  }
});
