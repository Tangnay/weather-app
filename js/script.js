var formEl = document.getElementById("search-form");
var cityInputEl = document.getElementById("city-input");

var displayWeather = function (data, city) {
  console.log(data);
  var todayWeatherEl = document.querySelector(".today-weather");
  todayWeatherEl.innerHTML = "";

  var cityWeatherH2 = document.createElement("h2");
  todayWeatherEl.appendChild(cityWeatherH2);

  var citySpan = document.createElement("span");
  var todayDate = new Date(data.dt * 1000).toLocaleDateString();
  citySpan.textContent = city + " " + todayDate;
  cityWeatherH2.appendChild(citySpan);

  var imgIcon = document.createElement("img");
  imgIcon.src =
    "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
  cityWeatherH2.appendChild(imgIcon);

  var tempEl = document.createElement("p");
  tempEl.textContent = "Temp: " + data.main.temp + " F";
  todayWeatherEl.appendChild(tempEl);

  var windEl = document.createElement("p");
  windEl.textContent = "Wind: " + data.wind.speed + " MPH";
  todayWeatherEl.appendChild(windEl);

  var humidityEl = document.createElement("p");
  humidityEl.textContent = "Humidity: " + data.main.humidity + " %";
  todayWeatherEl.appendChild(humidityEl);

  console.log(city);
  console.log(data.main.temp);
};

var getWeatherInfor = function (city) {
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    ",usa&APPID=937529a2bdb4f97d2fa01cb4f1237ff1&units=imperial";

  fetch(url)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data, city);
        });
      }
    })
    .catch(function (error) {
      alert("unable to connect to the weather!");
    });
};

var searchHandler = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();

  if (city) {
    getWeatherInfor(city);
    getFiveDaysWeather(city);
  } else {
    alert("Please enter a city!!");
  }
};

formEl.addEventListener("submit", searchHandler);

let weather = {
  apiKey: "937529a2bdb4f97d2fa01cb4f1237ff1",
};
// five days
var displayFiveDays = function (data, city) {
  console.log(data.list);
  var currentDate = ""; // 12
  var allDate = [];
  // [weather-day12, wheater day 13]

  // get the date
  for (let i = 0; i < data.list.length; i++) {
    // i=2
    var firstDate = new Date(data.list[i].dt * 1000).getDate(); // 13
    if (firstDate !== currentDate) {
      allDate.push(data.list[i]);
      currentDate = firstDate;
    }
  }

  var cardFiveDay = document.querySelector(".five-days");
  cardFiveDay.innerHTML = "";
  // document.appendChild(cardFiveDay);

  for (let i = 0; i < 5; i++) {
    // console.log(new Date(data.list[i].dt * 1000).getDate());
    var containerDiv = document.createElement("div");
    var dateEl = document.createElement("h6");
    dateEl.textContent = new Date(allDate[i].dt * 1000).toLocaleDateString();
    containerDiv.appendChild(dateEl);

    var dayTempEl = document.createElement("p");
    dayTempEl.textContent = "Temp: " + allDate[i].main.temp + " F";
    containerDiv.appendChild(dayTempEl);

    var dayWindEl = document.createElement("p");
    dayWindEl.textContent = "Wind: " + allDate[i].wind.speed + " MPH";
    containerDiv.appendChild(dayWindEl);

    var dayHumidityEl = document.createElement("p");
    dayHumidityEl.textContent = "Humidity: " + allDate[i].main.humidity + " %";
    containerDiv.appendChild(dayHumidityEl);
    cardFiveDay.appendChild(containerDiv);
  }

  var weahterIcon = document.createElement("img");
  // weahterIcon.src.textContent =
  //   "http://openweathermap.org/img/wn/" + data.list.weather[0].icon + ".png";
  // cardFiveDay.appendChild(weahterIcon);
};

var getFiveDaysWeather = function (city) {
  var url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=937529a2bdb4f97d2fa01cb4f1237ff1&units=imperial";

  fetch(url)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayFiveDays(data, city);
        });
      }
    })
    .catch(function (error) {
      alert("unable to connect to the weather!");
    });
};
