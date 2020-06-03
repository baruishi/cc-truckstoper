import React from "react";
import filterData from "../utils/filterData";

export default function CitySelection(props) {
  if (!props.stateName) {
    return filterData.allData.cities.map((city, i) => {
      return <option key={i}>{city}</option>;
    });
  } else {
    const stateId = filterData.allData.states.indexOf(props.stateName);
    let citiesByState;
    filterData.allData.cityByState.forEach((city) => {
      if (city.id === stateId) {
        citiesByState = city.cities;
      }
    });
    return citiesByState.map((city, i) => <option key={i}>{city}</option>);
  }
}
