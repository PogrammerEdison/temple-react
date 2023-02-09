import React, { useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { listUserProfiles } from "../graphql/queries";
import Profile from "../pages/Profile";
import {
  createUserProfile as createUserProfileMutation,
  deleteNote as deleteNoteMutation,
} from "../graphql/mutations";
import { urlSafeEncode } from "@aws-amplify/core";
import { API, Storage } from "aws-amplify";
import {
  Button,
  Image,
} from "@aws-amplify/ui-react";

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [image, setImage] = useState("undefined");

  // useEffect(() => {
  //   fetchPfp();

  // }, []);

  useEffect(() => {
    fetchUsers();
  }, []);




  async function fetchUsers() {
    const apiData = await API.graphql({ query: listUserProfiles });
    const notesFromAPI = apiData.data.listUserProfiles.items;
    let exist = false;
    await Promise.all(
      notesFromAPI.map(async (profile) => {
        if (profile.name === props.test.username) {
          exist = true
          fetchPfp()
        }
      })
    );
    if (exist === false){
      createUser()
    }
  }




  async function createUser() {
    const data = {
      name: props.test.username,
      image: "default",
    };
    //if (!!data.image) await Storage.put(data.name, image);
    console.log("creating user")
    await API.graphql({
      query: createUserProfileMutation,
      variables: { input: data },
    }).then(
    fetchUsers());
  }




/////////////////////////////////////////////////


  async function fetchPfp() {
    const apiData = await API.graphql({ query: listUserProfiles });
    const notesFromAPI = apiData.data.listUserProfiles.items;
    console.log(notesFromAPI);
    await Promise.all(
      notesFromAPI.map(async (user) => {
        if(user.name === props.test.username){
          if(user.image === "default"){
            const url = await Storage.get("default.jpg");
            console.log(url);
            setImage(url)
          }
          else{
            //set their image
            // console.log("the url is")
            // console.log(url)
            // user.image = url;
            // setImage(url);
            console.log("couldn't find the image")
          }
        }
        return user;
      })
    );
    
  }


  

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} style={{ color: "black" }} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <div className="close">
                  <AiIcons.AiOutlineClose />
                </div>
              </Link>
            </li>
            
            <li style={{ color: "red" }}>{props.test.username}</li>
            <li style={{ color: "red" }}>
              {console.log(image)}
              {image && (<Image
                src={image}
                alt={"undfeind"}
              />)}
              <Button onClick={props.button}>Sign Out</Button>
              <Link to="/profile">
                    <span>"profile"</span>
                  </Link>
            </li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
