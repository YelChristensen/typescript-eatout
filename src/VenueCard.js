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
          Food Hygiene Rating: {venue.grub[10].value}
        </Typography>
        <Typography variant="h5" component="h2">
          {venue.grub[2].value}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Distance: {venue.grub[10].value}
        </Typography>
        <Typography variant="body2" component="p">
          {venue.grub[5].value}
        </Typography>
        <Typography variant="body2" component="p">
          {venue.grub[6].value}
        </Typography>
        <Typography variant="body2" component="p">
          {venue.grub[7].value}
        </Typography>
        <Typography variant="body2" component="p">
          {venue.grub[8].value}
        </Typography>
        <Typography variant="body2" component="p">
          {venue.grub[9].value}
        </Typography>
      </CardContent>
    </Card>
  );
}
