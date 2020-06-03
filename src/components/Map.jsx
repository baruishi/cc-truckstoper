import React, { Component } from "react";
import PropTypes from "prop-types";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import "../../src/App.css";

const MyMap = withGoogleMap((props) => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={4}
    defaultCenter={{ lat: 40.7392, lng: -90.9903 }}
    onClick={props.onMapClick}
  >
    {props.newCoordinates.map((obj) => {
      return (
        <Marker
          icon={
            obj.type_of_stop === "Travel Stop"
              ? "http://maps.google.com/mapfiles/kml/pal4/icon54.png"
              : "http://maps.google.com/mapfiles/kml/pal2/icon50.png"
          }
          onClick={props.onMarkerClick.bind(null, obj)}
          position={{
            lat: obj.latitude,
            lng: obj.longitude,
          }}
        />
      );
    })}
  </GoogleMap>
));

class Map extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    if (this.props.locations.length <= 0) {
      this.props.getLocations();
    }
  }

  returnStation = (station) => {
    this.props.selectStation(station);
  };

  showFilter = (input) => {
    console.log(input);
  };

  render() {
    return process.env.npm_lifecycle_event === "test" ? (
      <div />
    ) : (
      <MyMap
        className="test"
        containerElement={<div className="mapContainer" />}
        mapElement={<div className="map" />}
        onMapLoad={() => {}}
        onMapClick={this.showFilter}
        markers={this.props.locations}
        onMarkerClick={this.returnStation}
        newCoordinates={this.props.coordinates}
        onMarkerRightClick={() => {}}
      />
    );
  }
}

Map.propTypes = {
  getLocations: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
};

export default Map;
