import React, { useState, useEffect } from "react";
import "./CardDailyWeather.css";
import axios from "axios";
import DailyWeatherInfo from "./DailyWeatherInfo";
import { ThreeDots } from "react-loader-spinner";

export default function CardDailyWeather(props) {
  let apiKey = "0ebc654fccbc00189d5408f3d6f15b08";
  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.coord.lat}&lon=${props.coord.lon}&units=metric&appid=${apiKey}`;

  let [forecast, setForecast] = useState();
  let [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
  }, [props.coord]);

  function displayForecast(response) {
    if ((response) => response.text()) {
      setForecast(response.data.daily);
      setReady(true);
    }
  }

  if (ready) {
    return (
      <div className="col-10 card card-daily-weather mt-5 mb-5">
        <div className="card-body">
          <h2 className="col-lg-12 daily-forecast card-title pt-2">
            DAILY FORECAST
          </h2>

          <div className="col-lg-12 daily-weather container mt-4">
            <div className="row">
              {forecast.map(function (dailyForecast, index) {
                if (index < 6) {
                  return (
                    <div className="col-lg-2 col-4" key={index}>
                      <DailyWeatherInfo forecast={dailyForecast} />
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    if (props.coord.lat) {
      axios.get(apiForecastUrl).then(displayForecast);
    }

    return (
      <div>
        <div className="col-10 card card-daily-weather mt-5 mb-5">
          <div className="row-6 card-body">
            <h2 className="col-lg-12 daily-forecast card-title pt-2">
              DAILY FORECAST
            </h2>
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
          </div>
        </div>
      </div>
    );
  }
}
