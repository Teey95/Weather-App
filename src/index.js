function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#current-city");
  let windElement = document.querySelector("#current-wind");
  let humidityElement = document.querySelector("#current-humidity");

  // Extracting data from the API response
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let windSpeed = Math.round(response.data.wind.speed * 3.6); // Convert m/s to km/h
  let humidity = response.data.temperature.humidity;

  // Updating the DOM
  cityElement.innerHTML = city;
  temperatureElement.innerHTML = `${temperature}`;
  windElement.innerHTML = `${windSpeed} km/h`;
  humidityElement.innerHTML = `${humidity}%`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;

  let forecastHtml = "";
  forecast.forEach(function (day, index) {
    if (index < 5) {
      let dayName = new Date(day.time * 1000).toLocaleDateString(undefined, {
        weekday: "short",
      });
      forecastHtml += `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${dayName}</div>
          <div class="weather-forecast-icon">🌤️</div>
          <div class="weather-forecast-temperatures">
            <strong>${Math.round(
              day.temperature.maximum
            )}º</strong> / ${Math.round(day.temperature.minimum)}º
          </div>
        </div>
      `;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector(".search-form-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  // Fetch current weather
  axios
    .get(apiUrl)
    .then(displayTemperature)
    .catch(() => {
      alert("Unable to retrieve weather data. Please try again.");
    });

  // Fetch forecast
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(forecastUrl).then(displayForecast);
}

function formatDate(date) {
  let options = { weekday: "long", hour: "2-digit", minute: "2-digit" };
  return date.toLocaleDateString(undefined, options);
}

// Event listener for the search form
let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", search);

// Display the current date
let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

// Initialize default city data
function initialize() {
  let defaultCity = "Paris";
  let apiKey = "b2a5adcct04b33178913oc335f405433";

  // Fetch default city's current weather
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(displayTemperature)
    .catch(() => {
      alert("Unable to retrieve weather data for the default city.");
    });

  // Fetch default city's forecast
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${defaultCity}&key=${apiKey}&units=metric`;
  axios(forecastUrl).then(displayForecast);
}

initialize();
