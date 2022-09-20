import React from "react";
import "./CardMainWeather.css";
import FormattedDate from "./FormattedDate";
import SearchCity from "./SearchCity";
import TempInfo from "./TempInfo";
import { WiHumidity } from "weather-icons-react";
import { WiStrongWind } from "weather-icons-react";

export default function WeatherInfo(props) {
  return (
    <div className="col-10 card card-main-weather mt-5 mb-5">
      <i className="fa-solid fa-location-dot"></i>
      <div className="card-body">
        <div className="row pt-2  justify-content-between">
          <div className="col-lg-6 col-12">
            <h1 className="city-name">{props.date.cityInfo}</h1>
            <h4 className="date-info card-subtitle">
              <FormattedDate date={props.date.lastUpdate} type={`main`} />
            </h4>
          </div>

          <div className="set-city-form col-lg-6 col-12">
            <SearchCity
              showWeather={props.showWeather}
              updateCity={props.updateCity}
              getLocation={props.getLocation}
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col justify-content-start">
            <TempInfo temperature={props.date.temperature} />
            <h3 className="row-4 description text-capitalize">
              {props.date.description}
            </h3>
          </div>

          <div className="col justify-content-center">
            <div className="row-4 container-icon-weather">
              <img
                className="icon-weather"
                alt="icon weather"
                src={props.date.icon}
              />
            </div>
          </div>

          <div className="col justify-content-end">
            <h4 className="row-4 humidity">
              <WiHumidity className="mb-1" size={20} color="#f2ebe9" />{" "}
              {props.date.humidity} %
            </h4>
            <h4 className="row-4 wind">
              <WiStrongWind className="mb-1" size={20} color="#f2ebe9" />{" "}
              {props.date.wind} km/h
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
