import React, { useState } from "react";
import Header from "./Header";
import Search from "./Search";
import Fetch from "./Fetch";
// import { Paper } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";

import hero from "./hero.jpg";

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
