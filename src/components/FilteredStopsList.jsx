import React, { Component } from "react";
import FilteredStop from "./FilteredStop";
import "./FilteredStopsList.css";

export default class FilteredStopsList extends Component {
  render() {
    const stops = this.props.filteredLocations.map((truckStop, index) => {
      return <FilteredStop truckInfo={truckStop} id={index} key={index} />;
    });

    return <div className="stopContainer">{stops}</div>;
  }
}
