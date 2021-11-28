import React, { useState, useContext } from 'react'
import { WeatherContext } from '../../context/weatherContext';
import AutoCompleteInput from '../AutoComplete';

const Overlay = ({focusRef}) => { 
  const { getWeather, setError, showOverlay} = useContext(WeatherContext)
  const [userSearch, setUserSearch] = useState("")
  const [favourites, setFavourites] = useState(["London", "Barcelona", "Sydney"])

  const handleSelect = (address) => {
    if(!address) {
      setError("City name is required!")
      return
    }
    const formattedValue = address.split(", ")[0]
    getWeather(formattedValue)
    setUserSearch("")
  }

  const handleChange = (value) => {
    setError("")
    setUserSearch(value)
  }
  
  return (
    <div className={`overlay-container ${showOverlay && 'open'}`}>

      <div className="search-bar">
        <AutoCompleteInput
          userSearch={userSearch}
          handleChange={handleChange}
          handleSelect={handleSelect}
          focusRef={focusRef}
        />
        <button onClick={() => handleSelect(userSearch)}>Search</button>
      </div>
      <ul className="city-list">
        {favourites.map((favCity, i) => (
          <li key={i} className="city-list_item">
            <button onClick={() => handleSelect(favCity)}>{favCity}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Overlay