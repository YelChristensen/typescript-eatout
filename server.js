const express = require("express");
const app = express();
// const fetch = require("node-fetch");
const cors = require("cors");
const { default: axios } = require("axios");
// const bodyParser = require("body-parser");

app.set("port", process.env.PORT || 8080);
app.use(cors({ origin: "*" }));
// app.use(bodyParser.json());
// app.use("/static", express.static("static"));
// app.set("view engine", "hbs");
// app.get("/", function (req, res) {
//   res.render("index");
// });
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   next();
// });

// const long = -4.73561176951173;
// const lat = 55.9421692082746;

// app.get(`/`, async (req, res) => {
//   const response = await fetch(
//     `https://ratings.food.gov.uk/enhanced-search/en-GB/^/^/DISTANCE/1/^/-4.73561176951173/55.9421692082746/1/30/json`
//   );
//   const data = await response.json();
//   console.log(data, "data");
//   res.json(await data);
// });

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
