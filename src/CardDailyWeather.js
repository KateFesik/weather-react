import React from "react";
import "./styles.css";
import axios from "axios";

export default function CardDailyWeather(props) {
  let apiKey = "6044b52d072e537df7be674146654ba7";
  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.coord.lat}&lon=${props.coord.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiForecastUrl).then(displayForecast);

  function displayForecast(response) {
    if ((response) => response.text()) {
      let forecast = response.data.daily;
      let forecastElement = document.querySelector("#forecast");

      let forecastHTML = `<div class="row">`;
      forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
          forecastHTML =
            forecastHTML +
            `
          <div class="col-lg-2 col-4 mb-4">
            <div class="weather-forecast-date">${formatForecastDate(
              forecastDay.dt
            )}</div>
            <img
              class="icons-daily"
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
            />
            <div class="weather-forecast-temperatures">
              <span id="forecast_temp">${Math.round(
                forecastDay.temp.day
              )}</span>
              <span id="forecast_degrees">°C</span>
            </div>
          </div>
        `;
        }
      });
      forecastHTML = forecastHTML + `</div>`;
      forecastElement.innerHTML = forecastHTML;
    }
  }

  function formatForecastDate(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  return (
    <div className="col-10 card card-daily-weather mt-5 mb-5">
      <div className="row-6 card-body">
        <h2 className="col-lg-12 daily-forecast card-title pt-2">
          DAILY FORECAST
        </h2>
        <div
          className="col-lg-12 daily-weather container mt-5 ms-2"
          id="forecast"
        ></div>
      </div>
    </div>
  );
}
