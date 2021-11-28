import { useState } from "react";

export default function useDegree() {
  const [degreeType, setDegreeType] = useState("metric");

  const updateDegreeType = (e) => {
    setDegreeType(e.target.value);
  };

  const temperature = (temp) => {
    const fahrenheit = Math.round((temp * 9) / 5 + 32);
    const celcius = Math.round(temp);
    const degreeJSX =
      degreeType === "metric" ? (
        <>
          {celcius}
          <span>˚C</span>
        </>
      ) : (
        <>
          {fahrenheit}
          <span>˚F</span>
        </>
      );

    return degreeJSX;
  };

  return [degreeType, updateDegreeType, temperature];
}
