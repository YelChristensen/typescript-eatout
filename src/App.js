import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import XMLParser from "react-xml-parser";

function App() {
  const [grubList, setGrubList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Axios.get(
      "https://cors-anywhere.herokuapp.com/https://ratings.food.gov.uk/search/cafe/norwich/2/30/xml",
      {
        headers: new Headers({
          Accept: "text/html",
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
        console.log(g);
        setGrubList(g);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
