const locations = require("./locations.js");

const getAddressInfo = (location) => {
  return {
    state: location.Addresses[0].State,
    city: location.Addresses[0].City,
    addressName:
      location.Addresses[0].Address1 +
      " " +
      location.Addresses[0].City +
      ", " +
      location.Addresses[0].State +
      " " +
      location.Addresses[0].Zip,
  };
};

const getTruckServicesAndAmenities = (location) => {
  const serviceAndAmenityObj = {
    selectedAmenity: "",
    service: "",
    amenities: "",
  };
  location.CustomFields.map((CustomField) => {
    const fieldSection = CustomField.CustomField.Section;
    if (fieldSection.includes("Amenities")) {
      serviceAndAmenityObj.selectedAmenity +=
        CustomField.CustomField.Name + ",";
    } else if (fieldSection.includes("Truck")) {
      serviceAndAmenityObj.service += CustomField.CustomField.Name + ",";
    }
  });

  location.AdditionalAmenities.map((amenity) => {
    const amenityTitle = amenity.SiteManagementItem.Title;
    serviceAndAmenityObj.amenities += amenityTitle + ",";
  });

  return serviceAndAmenityObj;
};

const getRestaurants = (location) => {
  let restString = "";
  location.Site.Concepts.map((restaurants) => {
    restString += restaurants.Concept.Name + ",";
  });

  return restString;
};

const getContactDetails = (location) => {
  const contactDetailsObj = {
    fax: "",
    mainPhone: "",
  };

  location.ContactMethods.map((contactMethod) => {
    if (contactMethod.Type.Name === "Fax") {
      contactDetailsObj.fax = contactMethod.Data;
    } else if (contactMethod.Type.Name === "Main Phone") {
      contactDetailsObj.mainPhone = contactMethod.Data;
    }
  });
  return contactDetailsObj;
};

const getParking = (location) => {
  const parkingDetailsObj = {
    parkingSpaces: "",
    defParking: "",
  };
  location.FilteredCustomFields.map((parkingDetails) => {
    if (parkingDetails.CustomField.Label.includes("Parking")) {
      parkingDetailsObj.parkingSpaces = parkingDetails.Value;
    } else if (parkingDetails.CustomField.Label.includes("DEF")) {
      parkingDetailsObj.defParking = parkingDetails.Value;
    }
  });
  return parkingDetailsObj;
};

const getFuelPrices = (location) => {
  const gasInfoObj = {};

  location.Site.FuelPrices.map((gasInfo) => {
    gasInfoObj[gasInfo.FuelType] = gasInfo.CashPrice;
  });
  return gasInfoObj;
};

const cleanTruckstopData = locations.map((location) => {
  const addressInfoz = getAddressInfo(location);
  const amenityAndService = getTruckServicesAndAmenities(location);
  const restaurants = getRestaurants(location);
  const contactDetails = getContactDetails(location);
  const parkingDetails = getParking(location);
  const fuelPrices = getFuelPrices(location);
  const newLocationInfo = {
    latitude: location.Site.Latitude,
    longitude: location.Site.Longitude,
    name: location.Site.SiteName,
    address: addressInfoz.addressName,
    state: addressInfoz.state,
    city: addressInfoz.city,
    highway: location.Site.Highway,
    store_num: "Store #" + String(location.Site.SiteNumber),
    exit: "Exit" + " " + location.Site.ExitNumber,
    selected_amenities: amenityAndService.selectedAmenity,
    truck_services: amenityAndService.service,
    amenities: amenityAndService.amenities,
    restaurants: restaurants,
    type_of_stop: location.FacilitySubtype.Name,
    main_phone: contactDetails.mainPhone,
    fax: contactDetails.fax,
    parking_spaces: parkingDetails.parkingSpaces,
    def_parking: parkingDetails.defParking,
    unleaded: String(fuelPrices.Unleaded),
    midgrade: String(fuelPrices.Midgrade),
    premium: String(fuelPrices.Premium),
    diesel: String(fuelPrices["Bio-Diesel B15"]),
    def: String(fuelPrices["Bulk DEF"]),
  };
  return newLocationInfo;
});

module.exports = { cleanTruckstopData };

//console.log(cleanTruckstopData); // uncomment to see the data

//if there isn't a type of gas it will be a string saying 'undefined'
