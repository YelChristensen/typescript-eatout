import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import MyLocationIcon from "@material-ui/icons/MyLocation";

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
  const [searchValue, setSearchValue] = useState("");
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.searchPlace}>
      <Typography variant="h5">
        Enter your postcode to view cafes, canteens and restaurants nearby
      </Typography>
      <FormControl className={classes.margin} variant="outlined">
        <Grid container direction="row">
          <TextField
            label="Search"
            id="outlined-end-adornment"
            sx={{ m: 1, width: "25ch" }}
            value={searchValue}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => {
                    setSearchValue("BR6 9WE");
                    params.setSearchString("BR6 9WE");
                  }}
                >
                  <IconButton>
                    <MyLocationIcon color="primary" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              params.setSearchString(e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ margin: "1em 1em 0 1em " }}
            onClick={() => params.setToggle(true)}
          >
            Search
          </Button>
        </Grid>
      </FormControl>
    </Container>
  );
};

export default Search;
