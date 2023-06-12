const apiKey = "2543f7025ca129c8c2d107d815218354"

// Function to handle form submission and fetch weather data
function getWeatherForecast(cityName) {
  // Clear previous forecast data
  // Fetch weather forecast data
  const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
  fetch(apiUrl)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const dateSpot = document.querySelector(".date")
      dateSpot.innerHTML = month + "/" + day + "/" + year
      var name = document.querySelector('.name')
      name.innerHTML = data.city.name
      var icon = document.querySelector(".icon")
      icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png");
      icon.setAttribute("alt", data.list[0].weather[0].main);
      var temp = document.querySelector(".temp")
      temp.innerHTML = "Temperature: " + Math.floor(data.list[0].main.temp) + "&#176F"
      var hum = document.querySelector(".hum")
      hum.innerHTML = "Humidity: " + Math.floor(data.list[0].main.humidity) + "%"
      var wind = document.querySelector(".wind")
      wind.innerHTML = "Wind Speed: " + Math.floor(data.list[0].wind.speed) + "mph"
      const forecastCard = document.querySelectorAll(".forecastCard");
      for (i = 0; i < forecastCard.length; i++) {
          forecastCard[i].innerHTML = "";
          const index = i * 8 + 4;
          const forecastDate = new Date(data.list[index].dt * 1000);
          const forecastDay = forecastDate.getDate();
          const forecastMonth = forecastDate.getMonth() + 1;
          const forecastYear = forecastDate.getFullYear();
          const forecastDateEl = document.createElement("p");
          forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
          forecastCard[i].append(forecastDateEl);
          const forecastWeatherEl = document.createElement("img");
          forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[index].weather[0].icon + "@2x.png");
          forecastWeatherEl.setAttribute("alt", data.list[index].weather[0].description);
          forecastCard[i].append(forecastWeatherEl);
          // Forecast Temp
          const forecastTemp = document.createElement("p");
          forecastTemp.innerHTML = "Temp: " + data.list[index].main.temp + "&#176F";
          forecastCard[i].append(forecastTemp);
          // Forecast Wind
          const forecastWind = document.createElement("p");
          forecastWind.innerHTML = "Wind: " + data.list[index].wind.speed + "mph";
          forecastCard[i].append(forecastWind);
          // Forecast Humidity
          const forecastHumidity = document.createElement("p");
          forecastHumidity.innerHTML = "Humidity: " + data.list[index].main.humidity + "%";
          forecastCard[i].append(forecastHumidity);
      }
    })
}
  
// Attach form submission event listener
const searchBtn = document.querySelector('.searchBtn');
searchBtn.addEventListener('click', function(event) {
  event.preventDefault()
  // Get the city input value
  const cityInput = document.getElementById('city-input');
  const city = cityInput.value;
  getWeatherForecast(city)
});

getWeatherForecast("washington dc")