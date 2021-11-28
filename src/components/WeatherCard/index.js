import React from "react";
import Moment from "react-moment";

export default function WeatherCard({ day, temperature }) {
  const image =
    require(`../../assets/icons/${day.weather[0].icon}.png`).default;

  return (
    <div className="card">
      <Moment className="card__date" unix format="ddd, D MMM">
        {day.dt}
      </Moment>
      <img
        className="card__img"
        draggable={false}
        src={image}
        alt={day.weather.description}
      />
      <div className="card__temp">
        <p className="card__temp-max">{temperature(day.temp.max)}</p>
        <p className="card__temp-min">{temperature(day.temp.min)}</p>
      </div>
    </div>
  );
}
