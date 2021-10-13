import React, { useCallback, useState } from "react";
import Axios from "axios";
import useGeolocation from "./useGeolocation";
import {
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  searchPlace: {
    padding: 60,
    textAlign: "center",
  },
}));

const Search = (params) => {
  const [content, setContent] = useState("");
  const location = useGeolocation();
  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      params.searchString
        ? validatePostcode()
        : setContent("Please enter a postcode");
    },
    [params.searchString]
  );

  const handleUseMyLocation = useCallback(() => {
    if (location.error) {
      setContent(
        `Error: ${location.error.message}. You may need to allow this site to access your location or use the search by postcode option.`
      );
    } else {
      params.setToggle(true);
      params.setSearchString("");
      params.setLatLong(location.coordinates);
    }
  });

  const validatePostcode = useCallback(() => {
    const postcodeURL = "https://api.postcodes.io/postcodes";
    Axios.get(`${postcodeURL}/${params.searchString}/validate`)
      .then((response) => {
        if (response.data.result === true) {
          params.setLatLong(location.coordinates);
          params.setToggle(true);
        } else {
          params.setSearchString("");
          setContent("This is not a valid postcode. Try again.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

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
                onClick={handleSearch}
              >
                <SearchIcon />
              </Button>
            </Grid>
          </FormControl>
        </Grid>
        <Grid item>
          <Typography style={{ color: "red" }}>{content}</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ margin: "1em 1em 0 1em " }}
            disabled={location.loaded === false}
            onClick={handleUseMyLocation}
          >
            {location.loaded ? `Use my location` : "Getting your location"}
            <MyLocationIcon style={{ marginLeft: "5px" }} />
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Search;
