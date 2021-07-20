import React, { useState } from "react";
import Header from "./Header";
import Search from "./Search";
import Fetch from "./Fetch";
import {
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  InputBase,
  Paper,
  Typography,
} from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import hero from "./hero.jpg";

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    height: 750,
    backgroundImage: `url(${hero})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundBlendMode: "overlay",
    backgroundColor: "#ffffffbd",
  },
  searchPlace: {
    padding: 60,
    textAlign: "center",
  },
  search: {
    margin: 40,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.75),
    "&:hover": {
      backgroundColor: "white",
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function App() {
  const classes = useStyles();
  const [searchString, setSearchString] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <Header />
      <Paper className={classes.paperContainer}>
        {toggle ? (
          <Fetch searchString={searchString} />
        ) : (
          <Search setSearchString={setSearchString} setToggle={setToggle} />
        )}
        {/* <Container maxWidth="sm" className={classes.searchPlace}>
          <Typography variant="h5">
            Enter your postcode to view cafes, bars and restaurants nearby
          </Typography>
          <FormControl className={classes.margin}>
            <Grid alignItems="flex-end">
              <Input
                id="input-with-icon-adornment"
                placeholder="Search..."
                onChange={(e) => {
                  setSearchString(e.target.value);
                  console.log(searchString);
                }}
              />
              <IconButton aria-label="Search">
                <SearchIcon />
              </IconButton>
            </Grid>
          </FormControl>
        </Container> */}
      </Paper>
    </div>
  );
}

export default App;
