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
const limit = 5;
const cities = { name: "New Delhi", id: "1261481" };

const unit = "metric";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?&units=${unit}&q=`;
console.log(apiURL);
async function myWheatherData(city) {
  try {
    const response = await fetch(`${apiURL} + ${city} + &appid=${APIKey}`);
    var data = await response.json();
    console.log(data);
    cityNameData.innerHTML = data.name + " " + data.sys.country + ".";
    wheatherTemp.innerHTML = Math.round(data.main.temp) + "°C";
    realFeel.innerHTML = Math.round(data.main.feels_like) + "°C";
    chanceRain.innerHTML = data.weather[0].description;
    windData.innerHTML = Math.round(data.wind.speed) + "Km/h";
    humidityData.innerHTML = Math.round(data.main.humidity) + "%";
    let icon = data.weather[0].icon;
    let showIcon = getIcons(icon);
    const imgElement = `<img src="./img/${showIcon}" alt="rain-img">`;
    wConditionImg.innerHTML = imgElement;
    const wIconsElement = `<img src="./img/${showIcon}" alt="rain-img">`;
    wIconsData.innerHTML = wIconsElement;
    iconsNameD1.innerHTML = data.weather[0].description;
    visibilityData.innerHTML = data.visibility / 1000 + " km/h";

    saveData(city);
  } catch (error) {
    console.log(error);
  }
}
function saveData(city) {
  localStorage.setItem("cityName", city);
}

searchBtn.addEventListener("click", () => {
  if (searchInput.value == true) {
    myWheatherData(searchInput.value);
  } else {
    window.alert("No record found");
  }
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
    "03n": "scattled-cloud.png",
    "04n": "broken-cloud.png",
    "09n": "slower-rain.png",
    "10d": "w-rain.png",
    "11n": "thunderstorm.png",
    "13n": "snowy.png",
    "50d": "mist.png",
    "50n": "mist.png",
  };
  return showImages[icon] || "rainy_weather.png";
}
