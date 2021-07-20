import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import logo from "./LogoWhiteAndBlue.png";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <img
          width="200rem"
          src={logo}
          className="App-logo"
          alt="Eat Out logo with Avocado"
        />
      </Toolbar>
    </AppBar>
  );
}
export default Header;
