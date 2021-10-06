import React from "react";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import logo from "../assets/LogoWhiteAndBlue.png";

function Header(params) {
  return (
    <AppBar position="static" style={{ backgroundColor: "#fff" }}>
      <Toolbar>
        <IconButton onClick={() => params.setToggle(false)}>
          <img
            width="200rem"
            src={logo}
            className="App-logo"
            alt="Eat Out logo with Avocado"
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
