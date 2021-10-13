import React, { useEffect, useState } from "react";
import fhrs_0 from "../assets/fhrs_0.jpg";
import fhrs_1 from "../assets/fhrs_1.jpg";
import fhrs_2 from "../assets/fhrs_2.jpg";
import fhrs_3 from "../assets/fhrs_3.jpg";
import fhrs_4 from "../assets/fhrs_4.jpg";
import fhrs_5 from "../assets/fhrs_5.jpg";
import fhrs_awaitinginspection from "../assets/fhrs_awaitinginspection.jpg";
import fhrs_awaitingpublication from "../assets/fhrs_awaitingpublication.jpg";
import fhrs_exempt from "../assets/fhrs_exempt.jpg";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    margin: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function VenueCard(params) {
  const [image, setImage] = useState();
  const [mapURL, setMapURL] = useState();

  useEffect(() => {
    setMapURL(
      `https://www.google.com/maps/dir/${params.userLocation.lat},${params.userLocation.lng}/${params.venue.Geocode.Latitude},${params.venue.Geocode.Longitude}`
    );
    if (params.venue.RatingValue === "0") {
      setImage(<img src={fhrs_0} alt={params.venue.RatingValue} />);
    } else if (params.venue.RatingValue === "1") {
      setImage(<img src={fhrs_1} alt={params.venue.RatingValue} />);
    } else if (params.venue.RatingValue === "2") {
      setImage(<img src={fhrs_2} alt={params.venue.RatingValue} />);
    } else if (params.venue.RatingValue === "3") {
      setImage(<img src={fhrs_3} alt={params.venue.RatingValue} />);
    } else if (params.venue.RatingValue === "4") {
      setImage(<img src={fhrs_4} alt={params.venue.RatingValue} />);
    } else if (params.venue.RatingValue === "5") {
      setImage(<img src={fhrs_5} alt={params.venue.RatingValue} />);
    } else if (params.venue.RatingValue === "AwaitingInspection") {
      setImage(
        <img src={fhrs_awaitinginspection} alt={params.venue.RatingValue} />
      );
    } else if (params.venue.RatingValue === "AwaitingPublication") {
      setImage(
        <img src={fhrs_awaitingpublication} alt={params.venue.RatingValue} />
      );
    } else {
      setImage(<img src={fhrs_exempt} alt={params.venue.RatingValue} />);
    }
  }, []);

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>{image}</Grid>
          <Grid item>
            <Typography variant="h5" component="h2" align="center">
              {params.venue.BusinessName}
            </Typography>
          </Grid>
        </Grid>

        <Typography className={classes.pos} color="textSecondary">
          Distance: {parseFloat(params.venue.Distance).toFixed(2)} miles away. (
          <a href={mapURL} target="_blank">
            Directions
          </a>
          )
        </Typography>
        <Typography variant="body2" component="p">
          {params.venue.AddressLine1}
        </Typography>
        <Typography variant="body2" component="p">
          {params.venue.AddressLine2}
        </Typography>
        <Typography variant="body2" component="p">
          {params.venue.AddressLine3}
        </Typography>
        <Typography variant="body2" component="p">
          {params.venue.AddressLine4}
        </Typography>
        <Typography variant="body2" component="p">
          {params.venue.PostCode}
        </Typography>
      </CardContent>
    </Card>
  );
}
