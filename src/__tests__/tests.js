import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import App from "../App";
import Map from "../components/Map";
import FilterSelection from "../components/FilterSelection";
import FilteredStop from "../components/FilteredStop";
import FilteredStopsList from "../components/FilteredStopsList";

jest.mock();

// import Adapter from "enzyme-adapter-react-16";

// Enzyme.configure({ adapter: new Adapter() });

describe(<App />, () => {
  it("should render a Map, and a FilterSelection component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Map)).to.have.lengthOf(1);
    expect(wrapper.find(FilterSelection)).to.have.lengthOf(1);
  });
  it("should initialize with the expected state", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state("currentView")).to.equal("AllLocations");
    expect(wrapper.state("selectedState")).to.equal(null);
    expect(wrapper.state("selectedCity")).to.equal(null);
    expect(wrapper.state("selectedHighway")).to.equal(null);
    expect(wrapper.state("locations")).to.deep.equal([]);
    expect(wrapper.state("hideFilteredStopsList")).to.equal(true);
    expect(wrapper.state("selectedType")).to.equal("");
  });
});
