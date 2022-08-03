const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000
// app.use(express.json())
// console.log(path.join(__dirname))
// console.log(path.join(__filename))

// Defining path for Express config.
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views locations.
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Pradeep",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Pradeep",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpful: "This is helpful text.",
    title: "Help page",
    name: "Pradeep",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Yoo must provide an address",
    });
  }
  geoCode(req.query.address, (error, { location } = {}) => {
    if (error) {
      res.send({ error });
    }

    forecast(location, (error, forecastData) => {
      if (error) {
        res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errmsg: "This page is not found",
    name: "pradeep",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errmsg: "404 page not found",
    name: "pradeep",
  });
});

app.listen(port, () => {
  console.log("server is running on port 3000");
});
