import React, { useState } from "react";
import "./CardMainWeather.css";
import WeatherInfo from "./WeatherInfo";
import SearchCity from "./SearchCity";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function CardMainWeather(props) {
  let [weatherDate, setWeatherDate] = useState({ ready: false });

  function saveWeatherInfo(response) {
    if ((response) => response.text()) {
      props.saveNewCoord({
        lat: response.data.coord.lat,
        lon: response.data.coord.lon,
      });
      let getCountryNames = new Intl.DisplayNames(["en"], { type: "region" });
      setWeatherDate({
        ready: true,
        cityName: response.data.name,
        temperature: Math.round(response.data.main.temp),
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        wind: Math.round(response.data.wind.speed),
        lastUpdate: new Date(response.data.dt * 1000),
        cityInfo: `${response.data.name}, ${getCountryNames.of(
          response.data.sys.country
        )}`,
        icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      });
    }
  }

  let apiKey = "6044b52d072e537df7be674146654ba7";

  function showWeather(event) {
    event.preventDefault();
    let apiUrlByCity = `https://api.openweathermap.org/data/2.5/weather?q=${weatherDate.cityName}&units=metric&APPID=${apiKey}`;
    axios.get(apiUrlByCity).then(saveWeatherInfo);
  }
  function updateCity(event) {
    setWeatherDate((existingValues) => ({
      ...existingValues,
      cityName: event.target.value,
    }));
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

  if (weatherDate.ready) {
    return (
      <WeatherInfo
        date={weatherDate}
        getLocation={getLocation}
        showWeather={showWeather}
        updateCity={updateCity}
      />
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
          <SearchCity
            showWeather={showWeather}
            updateCity={updateCity}
            getLocation={getLocation}
          />
        </div>
      </div>
    );
  }
}
