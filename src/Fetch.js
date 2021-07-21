import React, { useEffect, useState } from "react";
import Axios from "axios";
import Geolocation from "./Geolocation";
import XMLParser from "react-xml-parser";
import { Container, makeStyles } from "@material-ui/core";

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
  const [grubList, setGrubList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    console.log(lat, long, "latlong");
    Axios.get(
      `https://cors-anywhere.herokuapp.com/https://ratings.food.gov.uk/enhanced-search/en-GB/^/^/DISTANCE/0/^/${long}/${lat}/1/30/xml`,
      {
        headers: new Headers({
          Accept: "text/html/xml",
          "content-type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT",
          "Access-Control-Allow-Headers": "Content-Type",
        }),
        mode: "no-cors",
      }
    )
      .then((d) => {
        let g = [];
        const xml = new XMLParser().parseFromString(d.data);
        let grubs = xml.children[1].children;
        for (let i in grubs) {
          if (
            grubs[i].children !== null &&
            grubs[i].children !== [] &&
            grubs[i].children.length > 0
          ) {
            g.push(grubs[i].children);
          }
        }
        console.log(g[0][2].value);
        setGrubList(g);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, [lat, long]);

  return isLoading ? (
    <Container maxWidth="sm" className={classes.searchLoading}>
      Loading..
      <Geolocation params={params} setLat={setLat} setLong={setLong} />
    </Container>
  ) : (
    <Container maxWidth="sm" className={classes.searchResults}>
      {grubList.map((grub) => (
        <div key={grub[2].value}>{grub[2].value}</div>
      ))}
      {console.log(params, "params")}
    </Container>
  );
}

export default Fetch;
