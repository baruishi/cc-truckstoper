module.exports = ({
  state,
  city,
  highway,
  typeOfStop,
  truckServices,
  unfilteredStations,
}) => {
  let stations = [...unfilteredStations];
  if (state) {
    stations = stations.filter((station) => station.state === state);
  }
  if (city) {
    stations = stations.filter((station) => station.city === city);
  }
  if (highway) {
    stations = stations.filter((station) => station.highway === highway);
  }
  if (typeOfStop) {
    stations = stations.filter(
      (station) => station.type_of_stop === typeOfStop
    );
  }
  if (truckServices) {
    truckServices = truckServices.join(",");
    stations = stations.filter((station) =>
      station.truck_services.includes(truckServices)
    );
  }
  return stations;
};
