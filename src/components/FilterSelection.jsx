import React from "react";
import StateSelection from "./StateSelection";
import CitySelection from "./CitySelection";
import HighwaySelection from "./HighwaySelection";
import "./FilteredSelection.css";

export default class FilterSelection extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="filter-selections-main">
        <div className="fiter-components">
          <div>Locations:</div>
          <div className="addpadding">
            <select onChange={this.props.handlers[0]}>
              <option>Select a state</option>
              <StateSelection />
            </select>

            <select onChange={this.props.handlers[1]}>
              <option>Select a city</option>
              <CitySelection stateName={this.props.stateName} />
            </select>

            <select onChange={this.props.handlers[2]}>
              <option>Select a highway</option>
              <HighwaySelection cityName={this.props.cityName} />
            </select>
          </div>
        </div>

        <div className="fiter-components">
          <div>Truck Services:</div>
          <div>
            <form className="truck-services" onChange={this.props.handlers[3]}>
              <div>
                <input
                  type="checkbox"
                  name="vehicle1"
                  value="NationalTireAccount"
                />
                National Tire Account
                <br />
              </div>
              <div>
                <input type="checkbox" name="vehicle2" value="TirePass" />
                Tire Pass
                <br />
              </div>
              <div>
                <input
                  type="checkbox"
                  name="vehicle3"
                  value="LightMechanical"
                />
                Light Mechanical
                <br />
              </div>

              <div>
                <input
                  type="checkbox"
                  name="vehicle3"
                  value="Commercial Truck Oil Cha"
                />
                Commercial Truck Oil Cha
                <br />
              </div>
            </form>
          </div>
        </div>

        <form
          className="fiter-components no-border"
          onChange={this.props.handlers[4]}
        >
          <div className="addpadding">
            <input
              type="radio"
              id="Travel Stop"
              value="Travel Stop"
              name="typeOfStop"
            />
            <label htmlFor="Travel Stop">Travel Stop</label>
            <br />
          </div>
          <div className="addpadding">
            <input
              type="radio"
              id="Country Store"
              value="Country Store"
              name="typeOfStop"
            />
            <label htmlFor="Country Store">Country Store</label>
            <br />
          </div>
        </form>

        <button id="searchButton" onClick={this.props.handlers[5]}>
          SEARCH
        </button>
      </div>
    );
  }
}
