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

  useEffect(() => {
    fetchPfp();
  }, []);

  async function fetchPfp() {
    const apiData = await API.graphql({ query: listUserProfiles });
    console.log(apiData);
    const notesFromAPI = apiData.data.listUserProfiles.items;
    console.log(notesFromAPI);
    await Promise.all(
      notesFromAPI.map(async (user) => {
        if (user.name == props.test.username) {
          console.log(user.name)
          console.log(user.image)
          const url = await Storage.get(user.name);
          console.log(url);
          setImage(url);
        }
      })
    );
  };


  

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
