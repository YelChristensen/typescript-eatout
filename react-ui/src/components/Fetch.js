import React, { useEffect, useState } from "react";
import Axios from "axios";

import VenueCard from "./VenueCard";
import { Button, Container, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  searchResults: {
    paddingTop: 60,
    alignItems: "center",
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
  const [userLocation, setUserLocation] = useState({ lat: "", long: "" });

  const venueFetch = (lat, long) => {
    Axios.get(
      `https://safe-garden-52184.herokuapp.com/${long}/${lat}/1/30/json`
    )
      .then((response) => {
        let venues =
          response.data.FHRSEstablishment.EstablishmentCollection
            .EstablishmentDetail;
        setIsLoading(false);
        return setVenueList(venues);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    const postcodeURL = "https://api.postcodes.io/postcodes";
    if (params.searchString) {
      Axios.get(`${postcodeURL}/${params.searchString}`).then((response) => {
        const lat = response.data.result.latitude;
        const lng = response.data.result.longitude;
        setUserLocation({ lat: lat, lng: lng });
        return venueFetch(lat, lng);
      });
    } else {
      setUserLocation({ lat: params.latlong.lat, lng: params.latlong.lng });
      venueFetch(params.latlong.lat, params.latlong.lng);
    }
  }, [params.searchString, params.latlong]);

  return isLoading ? (
    <Container maxWidth="sm" className={classes.searchLoading}>
      Loading...
    </Container>
  ) : (
    <Container maxWidth="sm" className={classes.searchResults}>
      <Grid item align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            params.setToggle(false);
            params.setSearchString("");
            params.setLatLong({});
          }}
        >
          Search again
        </Button>
      </Grid>
      <Grid container direction="column">
        {venueList.map((venue) => (
          <VenueCard
            key={venue.BusinessName}
            venue={venue}
            userLocation={userLocation}
          />
        ))}
      </Grid>
    </Container>
  );
}

export default Fetch;
