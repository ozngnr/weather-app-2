import axios from "axios";
import React, { useState, useEffect, createContext } from "react";

const WeatherContext = createContext();

const API_KEY = process.env.REACT_APP_WEATHER_KEY;
const API_BASE = `https://api.openweathermap.org/data/2.5`;

function WeatherContextProvider({ children }) {
  const [weather, setWeather] = useState("");
  const [location, setLocation] = useState({ lat: "", lon: "" });
  const [showOverlay, setShowOverlay] = useState(false);
  const [error, setError] = useState("");

  //functions
  const getWeather = async (location) => {
    try {
      const { data } = await axios(`${API_BASE}/weather`, {
        params: {
          appid: API_KEY,
          q: location,
        },
      });

      setLocation({
        lat: data.coord.lat,
        lon: data.coord.lon,
      });
      setShowOverlay(false);
    } catch (error) {
      switch (error.response.status) {
        case 404:
          setError("City Not Found");
          break;
        case 400:
          setError("Something Went Wrong :(");
          break;
        default:
          break;
      }
    }
  };

  const getPosition = (options) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
  //USEEFFECTS
  //Gets geolocation of the user
  useEffect(() => {
    const fetchData = () => {
      if (navigator.geolocation) {
        getPosition()
          .then((position) => {
            const { latitude, longitude } = position.coords;
            setLocation({
              lat: latitude,
              lon: longitude,
            });
            localStorage.setItem(
              "currentLocation",
              JSON.stringify({
                lat: latitude,
                lon: longitude,
              })
            );
          })
          .catch((e) => showError(e));
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    const showError = (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setError("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          setError("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          setError("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          setError("An unknown error occured.");
          break;
        default:
          break;
      }
    };

    fetchData();
  }, []);

  //Gets weather data
  useEffect(() => {
    const options = {
      params: {
        appid: API_KEY,
        units: "metric",
        exclude: "current,hourly,minutely",
        lat: location.lat,
        lon: location.lon,
      },
    };

    const axiosRequest = async () => {
      const currentData = await axios(`${API_BASE}/weather`, options);
      const dailyData = await axios(`${API_BASE}/onecall`, options);

      setWeather({
        location: currentData.data.name,
        current: currentData.data,
        daily: dailyData.data.daily,
      });
    };
    axiosRequest();
  }, [location]);

  return (
    <WeatherContext.Provider
      value={{
        error,
        setError,
        weather,
        getWeather,
        showOverlay,
        setShowOverlay,
        setLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext, WeatherContextProvider };
