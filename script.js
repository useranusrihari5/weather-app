const apiKey = "47b58fec4f317d04e417f461032e1f33";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const weatherCard = document.getElementById("weatherResult");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const icon = document.getElementById("icon");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found!");
      return;
    }
    if (data.cod === 401) {
      alert("Invalid or inactive API key!");
      return;
    }

    displayWeather(data);
    changeBackground(data.weather[0].main);
  } catch (error) {
    alert("Network error. Check internet.");
    console.error(error);
  }
}

function displayWeather(data) {
  weatherCard.classList.remove("hidden");

  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.innerHTML = `<i class="fa fa-thermometer-half"></i> Temperature: ${data.main.temp.toFixed(1)} °C`;
  description.innerHTML = `<i class="fa fa-cloud"></i> Condition: ${data.weather[0].description}`;
  humidity.innerHTML = `<i class="fa fa-tint"></i> Humidity: ${data.main.humidity}%`;
  wind.innerHTML = `<i class="fa fa-wind"></i> Wind Speed: ${data.wind.speed} m/s`;

  const iconCode = data.weather[0].icon;
  icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Change body class for gradient backgrounds
function changeBackground(weather) {
  const body = document.body;
  body.className = ""; // reset

  switch (weather.toLowerCase()) {
    case "clear":
      body.classList.add("clear"); break;
    case "clouds":
      body.classList.add("clouds"); break;
    case "rain":
    case "drizzle":
      body.classList.add("rain"); break;
    case "snow":
      body.classList.add("snow"); break;
    case "thunderstorm":
      body.classList.add("thunderstorm"); break;
    default:
      body.classList.add("clear");
  }
}
let inCelsius = true;
document.getElementById("toggleTemp").addEventListener("click", () => {
  if (!weatherCard.classList.contains("hidden")) {
    let tempText = temperature.textContent.split(":")[1].trim().split(" ")[0];
    let temp = parseFloat(tempText);
    if (inCelsius) temp = (temp * 9/5 + 32).toFixed(1) + " °F";
    else temp = ((temp - 32) * 5/9).toFixed(1) + " °C";
    temperature.innerHTML = `<i class="fa fa-thermometer-half"></i> Temperature: ${temp}`;
    inCelsius = !inCelsius;
  }
});
