import React, { useState } from "react";
import Axios from "axios";
import Header from "./Header";
import Search from "./Search";
import Fetch from "./Fetch";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";

import hero from "../assets/hero.jpg";

const useStyles = (theme) => ({
  "@global": {
    body: {
      height: "100%",
      backgroundImage: `url(${hero})`,
      backgroundRepeat: "repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundBlendMode: "overlay",
      backgroundColor: "#ffffffbd",
    },
    html: {
      height: "100%",
    },
  },
});

function App() {
  const [searchString, setSearchString] = useState("");
  const [toggle, setToggle] = useState(false);
  const long = "-4.73561176951173";
  const lat = "55.9421692082746";

  Axios.get(
    `http://localhost:8080/-4.73561176951173/55.9421692082746/1/30/json`
  )
    .then((response) => {
      console.log(
        response.data.FHRSEstablishment.EstablishmentCollection
          .EstablishmentDetail
      );
    })
    .catch((error) => {
      console.log(error);
    });

  // fetch(`http://localhost:8080/-4.73561176951173/55.9421692082746/1/30/json`)
  //   .then((response) => {
  //     response.json();
  //     // console.log(response, "response");
  //   })
  //   .then((data) => {
  //     console.log(
  //       data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail,
  //       "data"
  //     );
  //   })
  //   .catch((err) => {
  //     console.error("Request failed", err);
  //   });

  return (
    <CssBaseline>
      <div>
        <Header setToggle={setToggle} />

        {toggle ? (
          <Fetch searchString={searchString} />
        ) : (
          <Search setSearchString={setSearchString} setToggle={setToggle} />
        )}
      </div>
    </CssBaseline>
  );
}

export default withStyles(useStyles)(App);
