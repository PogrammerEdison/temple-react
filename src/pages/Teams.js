import React, { useEffect, useState, View } from "react";


function Teams() {

  var key = "RGAPI-c97cff27-64e3-4e13-8604-ce9f72b38865"


  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [champions, setChampions] = useState([])
  const [id, setID] = useState("skskdka")

  const [updated, setUpdated] = useState(message);

  // useEffect(() => {
  //   fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/EDSHEK?api_key=${key}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setPosts(data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  async function searchUser(){
    let masteryChamps = []
    await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${message}?api_key=${key}`)
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        setID(data.id)
        setPosts(data);
        getChampions(data.id)
      })
      .catch((err) => {
        console.log(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${key}`)
        console.log(err.message);
      });
  }

  async function getChampions(encryptionKey){
    await fetch(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptionKey}?api_key=${key}`)
      .then(response => response.json())
      .then((response) => {
        console.log(response);
        setChampions(response);
        getChampionList(response);
      })
      .catch((err) => {
        console.log(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptionKey}?api_key=${key}`)
        console.log(err.message);
      });
  }

  async function getChampionList(championInfo){
    var championList = []
    var championRanking = []
    await fetch(`https://ddragon.leagueoflegends.com/cdn/11.1.1/data/en_US/champion.json`)
      .then(response => response.json())
      .then((response) => {
        Object.values(response.data).map((champ, index) => {
          championInfo.map((champion)=>{
            if(champion.championId == champ.key){
              championList.push([champ.id, champion.championLevel, champion.championPoints])
              championRanking.push(champion.championPoints)
            }
          })
        })
        console.log(championRanking)
        championRanking = championRanking.sort((a, b) => a - b).reverse()
        console.log(championRanking)
        let champSort = []
        for (let i = 0; i<5; i++){
          championList.map((champion)=>{
            if(champion[2] == championRanking[i]){
              champSort.push(champion)
            }
          })
        }
        console.log(champSort)
        setChampions(champSort)



      })
      .catch((err) => {
        console.log(`https://ddragon.leagueoflegends.com/cdn/11.1.1/data/en_US/champion.json`)
        console.log(err.message);
      });
  }


  function inputHandler(e){
    console.log(e.target.value)
    setMessage(e.target.value)
  }



  return (


    <div className="posts-container" style={{textAlign: "center"}}>
              <div className="search" style={{display:"inline-block"}}>
        <input
          id="outlined-basic"
          variant="outlined"
          onChange={inputHandler}
          fullWidth
          label="Search"
          sstyle={{display:"inline-block"}}
        />
      </div><button onClick={searchUser}>Update</button>

            <div className="post-card" key={posts.name} style={{textAlign: "center"}}>
              <div className="post-title" >{posts.name} Level: {posts.summonerLevel}</div>
          
      </div>
      <div>{champions.map((champion)=>{
        return(
          <div style={{padding: "30px"}}>{champion[0]} Level: {champion[1]}  Mastery Points: {champion[2]}</div>
        )
      })}</div>
    </div>
    );
 };


export default Teams;
