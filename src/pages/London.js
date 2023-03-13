import React, { useState, useEffect } from 'react'
import styles from '../styles/pages.module.css'
import {
  Button,
  Image,
} from "@aws-amplify/ui-react";

function London() {

  const [weather, setWeather] = useState([])
  const [description, setDescription] = useState("")
  const [currentConditions, setCurrentConditions] = useState("")
  const [days, setDays] = useState([])



  async function fetchWeather(){
    let test = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London?unitGroup=metric&key=${process.env.REACT_APP_VISUAL_KEY}&contentType=json`)
    console.log(test)
    let data = await test.json()
    console.log(data)
    console.log(data.days)
    setDescription(data.description)
    setCurrentConditions(data.currentConditions.conditions)
    setDays(data.days)
    console.log(currentConditions)
    console.log(days)
  }



  return (
    <div className={styles.bg} style={{backgroundImage: "url(/londonBack.jpg)"}}>
      <center><h1>London</h1>

        <div style={{flexDirection: "column", }}>
          <div>{weather}</div>
          <div>{description}</div>
          <div>{currentConditions}</div>
        </div>
        <div style={{display: "flex", flexDirection: "row"}}>
        {days.map((day) => {
          return(
            <div>
              <div>{day.datetimeStr}</div>
              <div>{day.conditions}</div>
              <div>{day.tempmax}</div>
              <div>{day.tempmin}</div>
            </div>
          )
        })}
      
      </div>

      <div style={{position:"fixed", zIndex:"9999"}}>
      <Button onClick={fetchWeather}>Fetch</Button>
      </div>
      </center>
    </div>
  )
}

export default London