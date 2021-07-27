require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.set("port", process.env.PORT || 8080);
app.use(cors({ origin: "*" }));

app.get(":endpoint([\\/\\w\\.-]*)", function (req, res) {
  let endpoint =
    "https://ratings.food.gov.uk/enhanced-search/en-GB/^/^/DISTANCE/1/^" +
    req.params.endpoint;
  axios
    .get(endpoint)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(app.get("port"), () => {
  console.log(`Listening on ${app.get("port")}`);
});
