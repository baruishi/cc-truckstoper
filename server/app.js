// server/app.js
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const db = require("./knex.js");
const bodyParser = require("body-parser");
const app = express();

// Setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `*`);
  res.header(`Access-Control-Allow-Methods`, `*`);
  next();
});

app.get("/api/locations", async (req, res) => {
  try {
    const locations = await db("locations").select();
    res.json(locations);
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

app.get("/api/state/:state", async (req, res) => {
  try {
    const { state } = req.params;
    const allCities = await db("locations")
      .where({ state })
      .select();
    res.send(allCities);
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

app.get("/api/city/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const allCities = await db("locations")
      .where({ city })
      .select();
    res.send(allCities);
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

app.get("/api/highway/:highway", async (req, res) => {
  try {
    const { highway } = req.params;
    const allCities = await db("locations")
      .where({ highway })
      .select();
    res.send(allCities);
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

module.exports = app;
