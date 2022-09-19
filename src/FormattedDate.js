import React from "react";

export default function FormattedDate(props) {
  /**
   @todo: addd formattedDate in CardDailyWeather
**/
  let date = new Date(props.date);
  let days;
  let formattedDate;
  if (props.type === "main") {
    days = [
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
    formattedDate = `${day} ${time}`;
  } else {
    days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    formattedDate = days[date.getDay()];
    alert(formattedDate);
  }

  return <div>Last update: {formattedDate}</div>;
}
