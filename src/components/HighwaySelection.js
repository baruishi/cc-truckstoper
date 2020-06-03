import React from "react";
import filterData from "../utils/filterData";

export default function HighwaySelection(props) {
  if (!props.cityName) {
    return filterData.allData.highways.map((highway, i) => {
      return <option key={i}>{highway}</option>;
    });
  } else {
    const cityId = filterData.citiesFromDb.indexOf(props.cityName);
    let highwaysByCity;
    filterData.allData.highwaysByCity.forEach((highway) => {
      if (highway.id === cityId) {
        highwaysByCity = highway.highways;
      }
    });
    if (!highwaysByCity) {
      return <option>No highway to select</option>;
    }
    return highwaysByCity.map((highway, i) => (
      <option key={i}>{highway}</option>
    ));
  }
}
