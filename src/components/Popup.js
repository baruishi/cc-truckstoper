import React from "react";
import "../App";
import "./FilteredStop.css";
import "./FilteredSelection.css";

class Popup extends React.Component {
  render() {
    const stop = this.props.station;
    return (
      <div className="popup">
        <div className="popup\_inner">
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
            <button className="searchButton" onClick={this.props.closePopup}>
              close me
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
