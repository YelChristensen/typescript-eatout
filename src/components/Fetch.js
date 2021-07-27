import React, { useEffect, useState } from "react";
import Axios from "axios";

import VenueCard from "./VenueCard";

import "whatwg-fetch";
import { Container, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  searchResults: {
    paddingTop: 60,
  },
  searchLoading: {
    paddingTop: 60,
    textAlign: "center",
  },
}));

function Fetch(params) {
  const classes = useStyles();
  const [venueList, setVenueList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const postcodeURL = "https://api.postcodes.io/postcodes";
    Axios.get(`${postcodeURL}/${params.searchString}`)
      .then((response) => {
        const lat = response.data.result.latitude;
        const long = response.data.result.longitude;
        setLat(lat);
        setLong(long);
        return Axios.get(
          `https://safe-garden-52184.herokuapp.com/${long}/${lat}/1/30/json`
        );
      })
      .then((response) => {
        let venues =
          response.data.FHRSEstablishment.EstablishmentCollection
            .EstablishmentDetail;
        setIsLoading(false);
        return setVenueList(venues);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [params.searchString]);

  return isLoading ? (
    <Container maxWidth="sm" className={classes.searchLoading}>
      Loading..
      {/* <Geolocation params={params} setLat={setLat} setLong={setLong} /> */}
    </Container>
  ) : (
    <Container maxWidth="sm" className={classes.searchResults}>
      <Grid container direction="column">
        {venueList.map((venue) => (
          <VenueCard key={venue.BusinessName} venue={venue} />
        ))}
      </Grid>
    </Container>
  );
}

export default Fetch;
