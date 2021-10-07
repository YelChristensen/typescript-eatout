import React, { useState } from "react";
import useGeolocation from "./useGeolocation";
import {
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
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
}));

const Search = (params) => {
  const [content, setContent] = useState("");
  const location = useGeolocation();
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.searchPlace}>
      <Typography variant="h5">
        Enter your postcode to view cafes, canteens and restaurants nearby
      </Typography>
      <Grid container direction="column">
        <Grid item>
          <FormControl className={classes.margin} variant="outlined">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                label="Search"
                onChange={(e) => {
                  setContent("");
                  params.setSearchString(e.target.value);
                }}
              />

              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ margin: "1em 1em 0 0 " }}
                onClick={(e) => {
                  params.searchString
                    ? params.setToggle(true)
                    : setContent("Please enter a postcode");
                }}
              >
                <SearchIcon />
              </Button>
            </Grid>
          </FormControl>
        </Grid>
        <Grid item>{content}</Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ margin: "1em 1em 0 1em " }}
            onClick={() => {
              if (location.error) {
                setContent(
                  `Error: ${location.error.message}. You may need to allow this site to access your location or use the search by postcode option.`
                );
              } else if (location.loaded) {
                params.setToggle(true);
                params.setLatLong(location.coordinates);
              } else {
                setContent("Loading your location, try in a few seconds");
              }
            }}
          >
            Use my location
            <MyLocationIcon style={{ marginLeft: "5px" }} />
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Search;
