import React, { useState } from "react";
import "./CardMainWeather.css";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { WiHumidity } from "weather-icons-react";
import { WiStrongWind } from "weather-icons-react";
import { WiDirectionUp } from "weather-icons-react";
import { WiDirectionDown } from "weather-icons-react";
import { BiCurrentLocation } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";

export default function CardMainWeather(props) {
  let apiKey = "6044b52d072e537df7be674146654ba7";

  let [cityName, setCityName] = useState();

  let apiUrlByCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;

  let [cityInfo, setCityInfo] = useState();
  let [descriptionInfo, setDescriptionInfo] = useState();
  let [humidity, setHumidity] = useState();
  let [wind, setWind] = useState();
  let [icon, setIcon] = useState();
  let [lastUpdate, setLastUpdate] = useState();

  let [temperature, setTemperature] = useState();
  let [unints, setUnits] = useState("°C");
  let [tempMax, setTempMax] = useState();
  let [tempMin, setTempMin] = useState();

  function saveWeatherInfo(response) {
    if ((response) => response.text()) {
      props.saveNewCoord({
        lat: response.data.coord.lat,
        lon: response.data.coord.lon,
      });

      setTemperature(Math.round(response.data.main.temp));

      setTempMax(Math.round(response.data.main.temp_max));
      setTempMin(Math.round(response.data.main.temp_min));

      setDescriptionInfo(response.data.weather[0].description);
      setHumidity(response.data.main.humidity);
      setWind(Math.round(response.data.wind.speed));

      setLastUpdate(formatDate(response.data.dt * 1000));

      setIcon(
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );

      let getCountryNames = new Intl.DisplayNames(["en"], { type: "region" });
      setCityInfo(
        `${response.data.name}, ${getCountryNames.of(
          response.data.sys.country
        )}`
      );
    }
  }

  let [stateCelsius, setStateCelsius] = useState({
    opacity: "1",
  });
  let [stateFahrenheit, setStateFahrenheit] = useState({
    opacity: "0.6",
  });

  function convertToFahrenheit(event) {
    event.preventDefault();
    if (unints === "°C") {
      setUnits("°F");
      setStateFahrenheit({ opacity: "1" });
      setStateCelsius({ opacity: "0.6" });
      setTemperature(Math.round((temperature * 9) / 5 + 32));
      setTempMax(Math.round((tempMax * 9) / 5 + 32));
      setTempMin(Math.round((tempMin * 9) / 5 + 32));
    }
  }
  function convertToCelsius(event) {
    event.preventDefault();
    if (unints === "°F") {
      setUnits("°C");
      setStateFahrenheit({ opacity: "0.7" });
      setStateCelsius({ opacity: "1" });
      setTemperature(Math.round((5 / 9) * (temperature - 32)));
      setTempMax(Math.round((5 / 9) * (tempMax - 32)));
      setTempMin(Math.round((5 / 9) * (tempMin - 32)));
    }
  }

  //add last updated time
  function formatDate(timestamp) {
    let date = new Date(timestamp);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let time;
    if (minutes < 10) {
      time = `${hours}:0${minutes}`;
    } else {
      time = `${hours}:${minutes}`;
    }
    return `${day} ${time}`;
  }
  function showWeather(event) {
    event.preventDefault();
    axios.get(apiUrlByCity).then(saveWeatherInfo);
  }
  function updateCity(event) {
    setCityName(event.target.value);
  }

  function getLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude.toFixed(2);
      let lon = position.coords.longitude.toFixed(2);
      let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=metric&APPID=${apiKey}`;
      axios.get(apiUrlLocation).then(saveWeatherInfo);
    });
  }

  if (cityInfo) {
    return (
      <div className="col-10 card card-main-weather mt-5 mb-5">
        <i className="fa-solid fa-location-dot"></i>
        <div className="card-body">
          <div className="row pt-2  justify-content-between">
            <div className="col-lg-6 col-12">
              <h1 className="city-name">{cityInfo}</h1>
              <h4 className="date-info card-subtitle">
                Last update: {lastUpdate}
              </h4>
            </div>

            <div className="set-city-form col-lg-6 col-12">
              <form onSubmit={showWeather}>
                <input
                  className="input-city"
                  type="search"
                  placeholder="Please enter a city"
                  onChange={updateCity}
                  autoFocus="on"
                />
                <button
                  className="btn-search-city me-2 ms-2"
                  type="button"
                  onClick={showWeather}
                  title="Search"
                >
                  <BiSearch />
                </button>
                <button
                  className="btn-location me-2"
                  type="button"
                  onClick={getLocation}
                  title="Get location"
                >
                  <BiCurrentLocation />
                </button>
              </form>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col justify-content-start">
              <h2 className="row-4 temp-info">
                {temperature}
                <span className="unit">
                  <a
                    className="celsius"
                    href="/"
                    style={stateCelsius}
                    onClick={convertToCelsius}
                  >
                    °C
                  </a>{" "}
                  |{" "}
                  <a
                    className="fahrenheit"
                    href="/"
                    style={stateFahrenheit}
                    onClick={convertToFahrenheit}
                  >
                    °F
                  </a>
                </span>
              </h2>
              <h3 className="row-4 description">{descriptionInfo}</h3>
            </div>

            <div className="col justify-content-center">
              <div className="row-4 container-icon-weather">
                <img className="icon-weather" alt="icon weather" src={icon} />
              </div>
            </div>

            <div className="col justify-content-end">
              <h4 className="row-4 humidity">
                <WiHumidity className="mb-1" size={20} color="#f2ebe9" />{" "}
                {humidity} %
              </h4>
              <h4 className="row-4 wind">
                <WiStrongWind className="mb-1" size={20} color="#f2ebe9" />{" "}
                {wind} km/h
              </h4>
            </div>
          </div>
          <div className="row mt-2">
            <h4 className="row-4 temp-range">
              <WiDirectionUp className="mb-1" size={22} color="#f2ebe9" />
              {tempMax}
              {unints}{" "}
              <WiDirectionDown className="mb-1" size={34} color="#f2ebe9" />
              {tempMin}
              {unints}
            </h4>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-10 card card-main-weather mt-5 mb-5">
        <div className="m-5">
          <ThreeDots
            height="100"
            width="100"
            radius="9"
            color="#7c3e66"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
        <div className="set-city-form col-10 m-3">
          <form onSubmit={showWeather}>
            <input
              className="input-city"
              type="search"
              placeholder="Please enter a city"
              onChange={updateCity}
            />
            <button
              className="btn-search-city me-2 ms-2"
              type="button"
              onClick={showWeather}
              title="Search"
            >
              <BiSearch />
            </button>
            <button
              className="btn-location me-2"
              type="button"
              onClick={getLocation}
              title="Get location"
            >
              <BiCurrentLocation />
            </button>
          </form>
        </div>
      </div>
    );
  }
}
