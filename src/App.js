import React from "react";
import "./App.scss";
import { WeatherContainer } from "./containers/weatherContainer";
import { WeatherContextProvider } from "./context/weatherContext";

function App() {
  return (
    <WeatherContextProvider>
      <WeatherContainer />
    </WeatherContextProvider>
  );
}

export default App;
