import React, { useState } from "react";
import "./CardMainWeather.css";

export default function TempInfo(props) {
  let [state, setState] = useState({
    units: `°C`,
    stateCelsius: { opacity: "1" },
    stateFahrenheit: { opacity: "0.6" },
  });

  function convertToFahrenheit(event) {
    event.preventDefault();
    if (state.units === `°C`) {
      setState({
        units: `°F`,
        stateCelsius: { opacity: "0.6" },
        stateFahrenheit: { opacity: "1" },
      });
    }
  }
  function convertToCelsius(event) {
    event.preventDefault();
    if (state.units === `°F`) {
      setState({
        units: `°C`,
        stateCelsius: { opacity: "1" },
        stateFahrenheit: { opacity: "0.6" },
      });
    }
  }

  return (
    <div>
      <h2 className="row-4 temp-info">
        {state.units === `°C`
          ? `${props.temperature}`
          : `${Math.round((props.temperature * 9) / 5 + 32)}`}

        <span className="unit">
          <a
            className="celsius"
            href="/"
            style={state.stateCelsius}
            onClick={convertToCelsius}
          >
            °C
          </a>{" "}
          |{" "}
          <a
            className="fahrenheit"
            href="/"
            style={state.stateFahrenheit}
            onClick={convertToFahrenheit}
          >
            °F
          </a>
        </span>
      </h2>
    </div>
  );
}
