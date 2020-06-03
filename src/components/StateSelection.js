import React from "react";
import filterData from "../utils/filterData";

export default function StateSelection() {
  return filterData.allData.states.map((state, i) => (
    <option key={i}>{state}</option>
  ));
}
