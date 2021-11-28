import React from "react";
import WeatherCard from "../WeatherCard";
import NavigationRoundedIcon from "@material-ui/icons/NavigationRounded";
import { DegreeToggle, HumidityBar } from "..";

export default function Forecast({
  data,
  degreeType,
  updateDegreeType,
  temperature,
}) {
  const { daily, current } = data;

  return (
    <section className="section-forecast">
      <div className="container">
        <DegreeToggle
          updateDegreeType={updateDegreeType}
          degreeType={degreeType}
        />

        <div className="cards">
          {daily
            .slice(0, 6)
            .map((day, index) => (
              <WeatherCard key={index} day={day} temperature={temperature} />
            ))
            .slice(1)}
        </div>

        <div className="cards cards-highlights">
          <h1 className="cards__title">Today's Highlights</h1>

          <div className="card">
            <h3 className="card__name">Wind status</h3>
            <p className="card__text">
              {Math.round(daily[0].wind_speed)}
              <span className="card__text-unit"> mph</span>
            </p>
            <div className="card__compass">
              <div className="card__compass-iconBg">
                <NavigationRoundedIcon
                  style={{
                    transform: `rotate(${daily[0].wind_deg}deg)`,
                  }}
                  fontSize="small"
                />
              </div>
              <p className="card__compass-text"></p>
            </div>
          </div>

          <div className="card">
            <h3 className="card__name">Humidity</h3>
            <p className="card__text">
              {daily[0].humidity}
              <span className="card__text-unit">%</span>
            </p>
            <HumidityBar width={daily[0].humidity + "%"} />
          </div>

          <div className="card">
            <h3 className="card__name">Visibility</h3>
            <p className="card__text">
              {(current.visibility / 1609.34).toFixed(1)}
              <span className="card__text-unit"> miles</span>
            </p>
          </div>

          <div className="card">
            <h3 className="card__name">Air Pressure</h3>
            <p className="card__text">
              {daily[0].pressure}
              <span className="card__text-unit"> mb</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
