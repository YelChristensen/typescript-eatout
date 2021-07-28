// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const axios = require("axios");

// app.set("port", process.env.PORT || 8080);
// app.use(cors({ origin: "*" }));

// app.get(":endpoint([\\/\\w\\.-]*)", function (req, res) {
//   let endpoint =
//     "https://ratings.food.gov.uk/enhanced-search/en-GB/^/^/DISTANCE/1/^" +
//     req.params.endpoint;
//   axios
//     .get(endpoint)
//     .then((response) => {
//       res.json(response.data);
//     })
//     .catch((error) => {
//       res.json(error);
//     });
// });

// app.listen(app.get("port"), () => {
//   console.log(`Listening on ${app.get("port")}`);
// });

const express = require("express");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const cors = require("cors");
const axios = require("axios");

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 8080;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

  // Answer API requests.
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

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function (request, response) {
    response.sendFile(
      path.resolve(__dirname, "../react-ui/build", "index.html")
    );
  });

  app.listen(PORT, function () {
    console.error(
      `Node ${
        isDev ? "dev server" : "cluster worker " + process.pid
      }: listening on port ${PORT}`
    );
  });
}
