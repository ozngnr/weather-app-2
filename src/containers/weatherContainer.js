import React, { useContext } from "react";
import { CurrentLocation, Forecast } from "../components";
import { WeatherContext } from "../context/weatherContext";
import useDegree from "../hooks/useDegree";

export const WeatherContainer = () => {
  const { weather, setLocation } = useContext(WeatherContext);
  const [degreeType, updateDegreeType, temperature] = useDegree();

  return (
    <main>
      {weather.current ? (
        <>
          <CurrentLocation
            data={weather}
            setLocation={setLocation}
            temperature={temperature}
          />
          <Forecast
            data={weather}
            updateDegreeType={updateDegreeType}
            degreeType={degreeType}
            temperature={temperature}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};
