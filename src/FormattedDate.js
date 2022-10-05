import React from "react";

export default function FormattedDate(props) {
  let date, days, formattedDate;

  if (props.type === "main") {
    date = new Date(props.date);
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
    formattedDate = `Last update: ${day} ${time}`;
  } else {
    if (props.type === "daily") {
      date = new Date(props.date * 1000);
      days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let day = date.getDay();
      formattedDate = days[day];
    }
  }
  return <div>{formattedDate}</div>;
}
