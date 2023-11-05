import React, { useRef, useContext, useState } from 'react';
import Moment from 'react-moment';
import MyLocationRoundedIcon from '@material-ui/icons/MyLocationRounded';
import { Overlay } from '..';
import { WeatherContext } from '../../context/weatherContext';

export default function CurrentLocation({ data, temperature, setLocation }) {
  const { location, current } = data;
  const [favourites, setFavourites] = useState([]);
  const { setShowOverlay } = useContext(WeatherContext);
  const refEl = useRef(null);

  const weatherIcon =
    require(`../../assets/icons/${current.weather[0].icon}.png`).default;

  const toggleOverlay = () => {
    setShowOverlay(true);
    refEl.current.focus();
  };

  const addToFavourites = () => {
    if (!favourites.includes(location)) {
      setFavourites((state) => [...state, location]);
    }
  };

  return (
    <section className="section-weather">
      <div className="buttons">
        <button onClick={toggleOverlay}>Search Places</button>
        <button
          style={{ padding: '0.5em' }}
          onClick={() =>
            setLocation(JSON.parse(localStorage.getItem('currentLocation')))
          }
        >
          <MyLocationRoundedIcon fontSize="small" />
        </button>
      </div>

      <div className="currentWeather">
        <img
          className="currentWeather__img"
          src={weatherIcon}
          alt={current.weather[0].icon}
        />
        <p className="currentWeather__temp">{temperature(current.main.temp)}</p>
        <p className="currentWeather__state">
          {current.weather[0].description}
        </p>
        <p className="currentWeather__date">
          {'Today'}
          <span className="currentWeather__date-dot"></span>
          <Moment unix format="ddd, D MMM">
            {current.dt}
          </Moment>
        </p>
        <p className="currentWeather__city">{location}</p>
        <button onClick={addToFavourites}>Add to Favourites</button>
      </div>
      <Overlay focusRef={refEl} favourites={favourites} />
    </section>
  );
}
