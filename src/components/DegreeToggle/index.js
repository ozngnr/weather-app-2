import React from "react";

const DegreeToggle = ({ degreeType, updateDegreeType }) => {
  return (
    <div className="degree-toggle">
      <div className="dt-radio">
        <input
          id="celcius"
          type="radio"
          className="dt-radio__input"
          value="metric"
          onChange={updateDegreeType}
          checked={degreeType === "metric"}
        />
        <label htmlFor="celcius" className="dt-radio__label">
          °C
        </label>
      </div>
      <div className="dt-radio">
        <input
          id="fahrenheit"
          type="radio"
          className="dt-radio__input"
          value="imperial"
          onChange={updateDegreeType}
          checked={degreeType === "imperial"}
        />
        <label htmlFor="fahrenheit" className="dt-radio__label">
          °F
        </label>
      </div>
    </div>
  );
};

export default DegreeToggle;
