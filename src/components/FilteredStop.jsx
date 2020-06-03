import React from "react";
import "./FilteredStop.css";

export default function FilteredStop(props) {
  const stop = props.truckInfo;
  return (
    <div className="singleStopContainer">
      <div className="address">{stop.address}</div>
      <div className="leftAndRightContainer">
        <div className="leftContainer">
          <div className="exit">{stop.exit}</div>
        </div>
        <div className="rightContainer">
          <div className="highway">{stop.highway}</div>
        </div>
      </div>
      <div className="components">
        Phone:
        {stop.mainPhone}
      </div>
      <div className="components">
        Fax:
        {stop.fax}
      </div>
      <div className="components">
        Parking Spaces:
        {stop.parkingSpaces}
      </div>
      <div className="components">
        Unleaded:
        {stop.unleaded}
      </div>
      <div className="components">
        Midgrade:
        {stop.midgrade}
      </div>
      {stop.diesel === "undefined" ? null : (
        <div className="components">
          Diesel:
          {stop.diesel}
        </div>
      )}
      <div className="components">
        Def:
        {stop.def}
      </div>
    </div>
  );
}
