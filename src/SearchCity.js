import React from "react";
import "./CardMainWeather.css";
import { BiCurrentLocation } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";

export default function SearchCity(props) {
  return (
    <div className="search-city-form">
      <form onSubmit={props.showWeather}>
        <input
          className="input-city"
          type="search"
          placeholder="Please enter a city"
          onChange={props.updateCity}
          autoFocus="on"
        />
        <button
          className="btn-search-city me-2 ms-2"
          type="button"
          onClick={props.showWeather}
          title="Search"
        >
          <BiSearch />
        </button>
        <button
          className="btn-location me-2"
          type="button"
          onClick={props.getLocation}
          title="Get location"
        >
          <BiCurrentLocation />
        </button>
      </form>
    </div>
  );
}
