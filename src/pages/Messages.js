import React from "react";
import { Button, Image } from "@aws-amplify/ui-react";

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
          <div className={styles.parallelogram}>
            <div className={styles.imageUnskew}>
              <Image
                style={{
                  flexShrink: "0",
                  minWidth: "300%",
                  minHeight: "300%",
                  position: "relative",
                  right: "100px",
                }}
                src={"/london.jpg"}
              />
            </div>
          </div>
          <div className={styles.parallelogram}>
            <div className={styles.imageUnskew}>
              <Image
                style={{
                  flexShrink: "0",
                  minWidth: "300%",
                  minHeight: "300%",
                  position: "relative",
                  right: "400px",
                }}
                src={"/hongkong.jpg"}
              />
            </div>
          </div>
          <div className={styles.parallelogram}>
            <div className={styles.imageUnskew}>
              <Image
                style={{
                  flexShrink: "0",
                  minWidth: "300%",
                  minHeight: "300%",
                  position: "relative",
                  right: "100px",
                }}
                src={"/london.jpg"}
              />
            </div>
          </div>
          <div className={styles.parallelogram}>
            <div className={styles.imageUnskew}>
              <Image
                style={{
                  flexShrink: "0",
                  minWidth: "300%",
                  minHeight: "300%",
                  position: "relative",
                  right: "100px",
                }}
                src={"/london.jpg"}
              />
            </div>
          </div>
          <div className={styles.parallelogram}>
            <div className={styles.imageUnskew}>
              <Image
                style={{
                  flexShrink: "0",
                  minWidth: "300%",
                  minHeight: "300%",
                  position: "relative",
                  right: "100px",
                }}
                src={"/london.jpg"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;
