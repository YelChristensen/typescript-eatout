import React from "react";
import {
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  Typography,
} from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
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
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.searchPlace}>
      <Typography variant="h5">
        Enter your postcode to view cafes, canteens and restaurants nearby
      </Typography>
      <FormControl className={classes.margin}>
        <Grid container direction="row">
          <Input
            id="input-with-icon-adornment"
            placeholder="Search..."
            onChange={(e) => {
              params.setSearchString(e.target.value);
            }}
          />
          <IconButton
            aria-label="Search"
            onClick={() => params.setToggle(true)}
          >
            <SearchIcon />
          </IconButton>
        </Grid>
      </FormControl>
    </Container>
  );
};

export default Search;
