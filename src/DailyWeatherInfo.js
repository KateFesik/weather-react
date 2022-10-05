import React from "react";
import "./CardDailyWeather.css";
import FormattedDate from "./FormattedDate";

export default function DailyWeatherInfo(props) {
  let icon = `http://openweathermap.org/img/wn/${props.forecast.weather[0].icon}@2x.png`;
  return (
    <div className="col-lg-10 weather-forecast mb-4 text-center justify-content-between">
      <div className="row-2 weather-forecast-date ">
        <FormattedDate date={props.forecast.dt} type={`daily`} />
      </div>
      <img className="row-2 icons-daily" alt="icon weather" src={icon} />
      <div className="row-2 weather-forecast-temperatures ">
        {Math.round(props.forecast.temp.day)} °C
      </div>
    </div>
  );
}
