import React from 'react'
import { Button, Image } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";

import styles from "../styles/shapes.module.css";

function CityCard(props) {
  return (
    <Link to={props.path}>
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
          src={props.image}
        />
      </div>
    </div>
    </Link>
  )
}

export default CityCard;