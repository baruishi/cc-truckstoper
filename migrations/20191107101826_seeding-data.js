const cleanTruckstopData = require("../data/datafilter");
const Promise = require("bluebird");

exports.up = function(knex, Promise) {
  return Promise.each(cleanTruckstopData.cleanTruckstopData, (row) =>
    knex("locations").insert(row)
  );
};

exports.down = function(knex, Promise) {};
