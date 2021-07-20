import React, { useEffect, useState } from "react";
import Axios from "axios";
import XMLParser from "react-xml-parser";

function Fetch(params) {
  const [grubList, setGrubList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Axios.get(
      "https://cors-anywhere.herokuapp.com/https://ratings.food.gov.uk/search/cafe/norwich/2/30/xml",
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
  }, []);

  return isLoading ? (
    <div>Loading..</div>
  ) : (
    <div className="App">
      {grubList.map((grub) => (
        <div key={grub[2].value}>{grub[2].value}</div>
      ))}
      {console.log(params, "params")}
    </div>
  );
}

export default Fetch;
