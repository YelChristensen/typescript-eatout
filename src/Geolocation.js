import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function Geolocation(params) {
  const [isLoading, setIsLoading] = useState(false);
  console.log(params, "from Geolocation");

  useEffect(() => {
    setIsLoading(true);
    Axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.postcodes.io/postcodes/${params.params.searchString}`,
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
        let lat2 = d.data.result.latitude.toString();
        let long2 = d.data.result.longitude.toString();
        params.setLat(lat2);
        params.setLong(long2);
        console.log(lat2 + long2, "geolocation");

        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, []);
  return <div></div>;
}
