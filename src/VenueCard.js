import React from "react";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";

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

export default function VenueCard(venue) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Food Hygiene Rating: {venue.venue.RatingValue}
        </Typography>
        <Typography variant="h5" component="h2">
          {venue.venue.BusinessName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Distance: {venue.venue.Distance}
        </Typography>
        <Typography variant="body2" component="p">
          {venue.venue.AddressLine1}
        </Typography>
        <Typography variant="body2" component="p">
          {venue.venue.AddressLine2}
        </Typography>
        <Typography variant="body2" component="p">
          {venue.venue.AddressLine3}
        </Typography>
        <Typography variant="body2" component="p">
          {venue.venue.AddressLine4}
        </Typography>
        <Typography variant="body2" component="p">
          {venue.venue.PostCode}
        </Typography>
      </CardContent>
    </Card>
  );
}
