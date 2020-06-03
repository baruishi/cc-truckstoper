exports.up = function(knex, Promise) {
  return knex.schema.alterTable("locations", function(t) {
    t.string("address");
    t.string("state");
    t.string("city");
    t.string("highway");
    t.string("store_num");
    t.string("exit");
    t.string("selected_amenities");
    t.string("truck_services");
    t.string("amenities");
    t.string("restaurants");
    t.string("type_of_stop");
    t.string("main_phone");
    t.string("fax");
    t.string("parking_spaces");
    t.string("def_parking");
    t.string("unleaded");
    t.string("midgrade");
    t.string("premium");
    t.string("diesel");
    t.string("def");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("locations");
};
