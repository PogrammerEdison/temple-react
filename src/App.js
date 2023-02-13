import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Auth } from 'aws-amplify';
import { API, Storage } from "aws-amplify";
import {
  withAuthenticator,
} from "@aws-amplify/ui-react";
// import { listNotes } from "./graphql/queries";
import {
  createUserProfile as createUserProfileMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";


import { listUserProfiles } from "./graphql/queries";

const App = ({ signOut, user }) => {
  console.log(user);
  //const [notes, setNotes] = useState([]);

  // useEffect(() => {
  //   fetchNotes();
  // }, []);



  // async function fetchNotes() {
  //   const apiData = await API.graphql({ query: listNotes });
  //   const notesFromAPI = apiData.data.listNotes.items;
  //   await Promise.all(
  //     notesFromAPI.map(async (note) => {
  //       if (note.image) {
  //         const url = await Storage.get(note.name);
  //         note.image = url;
  //       }
  //       return note;
  //     })
  //   );
  //   setNotes(notesFromAPI);
  // }

  // async function createNote(event) {
  //   event.preventDefault();
  //   const form = new FormData(event.target);
  //   const image = form.get("image");
  //   const data = {
  //     name: form.get("name"),
  //     description: form.get("description"),
  //     image: image.name,
  //   };
  //   if (!!data.image) await Storage.put(data.name, image);
  //   await API.graphql({
  //     query: createNoteMutation,
  //     variables: { input: data },
  //   });
  //   fetchNotes();
  //   event.target.reset();
  // }

  // async function deleteNote({ id, name }) {
  //   const newNotes = notes.filter((note) => note.id !== id);
  //   setNotes(newNotes);
  //   await Storage.remove(name);
  //   await API.graphql({
  //     query: deleteNoteMutation,
  //     variables: { input: { id } },
  //   });
  // }



  // useEffect(() => {
  //    getUserInfo();
  //   }, []);


  //  async function getUserInfo() {
  //   const user = await Auth.currentAuthenticatedUser();
  //   console.log('attributes:', user.username);
  // }

  // useEffect(() => {
  //   fetchUsers();
  // }, []);




  // async function fetchUsers() {
  //   const apiData = await API.graphql({ query: listUserProfiles });
  //   const notesFromAPI = apiData.data.listUserProfiles.items;
  //   let exist = false;
  //   await Promise.all(
  //     notesFromAPI.map(async (profile) => {
  //       if (profile.name == user.username) {
  //         exist = true
  //       }
  //     })
  //   );
  //   if (exist == false){
  //     {console.log("create user")}
  //     createUser()
  //   }
  // }




  // async function createUser() {
  //   const data = {
  //     name: user.username,
  //     image: "default",
  //   };
  //   //if (!!data.image) await Storage.put(data.name, image);
  //   await API.graphql({
  //     query: createUserProfileMutation,
  //     variables: { input: data },
  //   }).then(
  //   fetchUsers());
  // }


  return (
    <>

        <Router>
          <Navbar button={signOut} test={user}/>
          <Routes>
            <Route path='/' exact element={<Home/>} />
            <Route path='/teams' element={<Teams/>} />
            <Route path='/home' exact element={<Home/>} />
            <Route path='/profile' element={<Profile username={user.username}/>} />
            <Route path='/messages' element={<Messages/>} />
          </Routes>
        </Router>

    </>
  );
};

export default withAuthenticator(App);
