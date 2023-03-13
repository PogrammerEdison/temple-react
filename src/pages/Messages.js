import React from "react";
import { Button, Image } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";
import CityCard from "../components/CityCard"
import { CityData } from "../components/cityData";

import styles from "../styles/shapes.module.css";

var key = process.env.REACT_APP_WEATHER_KEY;

let url = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=${key}`;

function Messages() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          right: "0",
          left: "0",
          top: "0",
          zIndex: "999",
        }}
      >
        <div style={{ position: "fixed", top: "15%" }}>
        {CityData.map((city) =>{
          return(
            <CityCard image={city.image} path={city.path} />
          )
        })}
      </div>
      </div>
    </>
  );
}

export default Messages;
