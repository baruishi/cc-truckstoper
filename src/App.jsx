import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Map from "./containers/Map";
import FilterSelection from "./components/FilterSelection";
import FilteredStopsList from "./components/FilteredStopsList";
import Popup from "./components/Popup";
import stationsFilter from "./utils/stationsFilter";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: null,
      selectedCity: null,
      selectedHighway: null,
      selectedStation: null,
      selectedTruckServices: [],
      selectedType: null,
      locations: [],
      filteredLocations: null,
      hideFilteredStopsList: true,
      showPopup: false,
    };
  }

  async componentDidMount() {
    let { data: locations } = await axios.get("/api/locations");
    this.setState({ locations: locations });
  }

  handleSearchButton = () => {
    const filteredStations = stationsFilter({
      state: this.state.selectedState,
      city: this.state.selectedCity,
      highway: this.state.selectedHighway,
      typeOfStop: this.state.selectedType,
      unfilteredStations: this.state.locations,
      truckServices: this.state.selectedTruckServices,
    });
    this.setState({
      filteredLocations: filteredStations,
      hideFilteredStopsList: false,
    });
  };

  handleStateSelection = (e) => {
    if (e.target.value === "Select a state") {
      this.setState({ selectedState: null });
      return;
    }
    this.setState({ selectedState: e.target.value });
  };

  handleCitySelection = (e) => {
    if (e.target.value === "Select a city") {
      this.setState({ selectedCity: null });
      return;
    }
    this.setState({ selectedCity: e.target.value });
  };

  handleHighwaySelection = (e) => {
    if (e.target.value === "Select a highway") {
      this.setState({ selectedHighway: null });
      return;
    }
    this.setState({ selectedHighway: e.target.value });
  };

  handleTruckServices = (e) => {
    if (this.state.selectedTruckServices.includes(e.target.value)) {
      let currentServices = [...this.state.selectedTruckServices];
      currentServices.splice(currentServices.indexOf(e.target.value), 1);
      this.setState({ selectedTruckServices: currentServices });
      return;
    }
    let addedService = [...this.state.selectedTruckServices, e.target.value];
    this.setState({ selectedTruckServices: addedService });
  };

  handleStopType = (e) => {
    this.setState({ selectedType: e.target.value });
  };

  handleSelectedStation = (station) => {
    this.setState({ selectedStation: station, showPopup: true });
  };

  togglePopup() {
    this.setState({ showPopup: !this.state.showPopup });
  }

  render() {
    return (
      <div className="app" style={{ height: "100%" }}>
        <div className="locations">
          <div className="header">
            <img src="tenor.gif" className="logo" />
            TRUCKSTOPPER
          </div>
        </div>
        <Map
          id="mapContainer"
          coordinates={
            this.state.filteredLocations
              ? this.state.filteredLocations
              : this.state.locations
          }
          selectStation={this.handleSelectedStation}
        />
        <div className="formAndListContainer">
          <div className="leftContainer">
            <FilterSelection
              id="view1"
              selectedState={this.state.selectedState}
              handlers={[
                this.handleStateSelection,
                this.handleCitySelection,
                this.handleHighwaySelection,
                this.handleTruckServices,
                this.handleStopType,
                this.handleSearchButton,
              ]}
              stateName={this.state.selectedState}
              cityName={this.state.selectedCity}
              handleStopType={this.handleStopType}
            />
            {this.state.showPopup ? (
              <Popup
                closePopup={this.togglePopup.bind(this)}
                station={this.state.selectedStation}
              />
            ) : null}
          </div>
          <div className="rightContainer">
            {this.state.hideFilteredStopsList ? (
              ""
            ) : (
              <FilteredStopsList
                filteredLocations={this.state.filteredLocations}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
