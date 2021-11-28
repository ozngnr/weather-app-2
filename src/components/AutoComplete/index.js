import React, { useContext } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import {WeatherContext} from '../../context/weatherContext'

export default function AutoCompleteInput({handleSelect, handleChange, userSearch, focusRef}) {
  const {error, setError} = useContext(WeatherContext) 

  return (
    <PlacesAutocomplete 
        value={userSearch} 
        onChange={handleChange} 
        onSelect={handleSelect}
        onError={() => setError("There is no such Location")}
        searchOptions={{
          types: ['(cities)']
        }}
        highlightFirstSuggestion
      >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input 
            ref={focusRef}
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'search-input',
            })}
          />
          <div className="suggestions">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item active'
                : 'suggestion-item';
              return (
                <div
                  key={suggestion.placeId}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
          {error && <div className="error-text">{error}</div>}
        </div>
      )}
      </PlacesAutocomplete>
  )
}