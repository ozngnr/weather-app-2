import React from 'react';

export default function HumidityBar( width ) {
  return (
    <div className="bar">
      <div className="bar__numbers">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
      <div className="bar__progress">
        <div 
          className="bar__progress-percentage"
          style={width}
        ></div>
      </div>
      <span style={{ float: "right"}}>%</span>
    </div>
  )
};
