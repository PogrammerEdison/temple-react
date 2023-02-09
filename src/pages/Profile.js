import React, { useState, useEffect } from "react";
import { getImg } from "./Database";
import { API, Storage } from "aws-amplify";
import {
  Button,
  ComponentPropsToStylePropsMap,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
} from "@aws-amplify/ui-react";
import { listUserProfiles } from "../graphql/queries";
import {
  createUserProfile as createUserProfileMutation,
  deleteUserProfile as deleteUserProfileMutation,
  updateUserProfile as updateUserProfileMutation,
} from "../graphql/mutations";

function Profile(props) {
  const [img, setImg] = useState("");

  useEffect(() => {
    setImage();
  }, []);

  async function setImage() {
    console.log(getImg(props.username));
    let stuff = await getImg(props.username);
    console.log("got the image")
    console.log(stuff)
    setImg(stuff);
  }

  async function changePfp() {
    let stuff = await getImg(props.username);
    setImg(stuff);
  }

  async function submitPfp(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: props.username,
      image: image,
    };
    console.log(image)
    const apiData = await API.graphql({ query: listUserProfiles });
    const notesFromAPI = apiData.data.listUserProfiles.items;
    console.log(notesFromAPI);
    await Promise.all(
      notesFromAPI.map(async (user) => {
        if (user.name === props.username) {
          const dataUpdate = {
            id: user.id,
            name: user.name,
            image: image.name,
          };
          console.log(dataUpdate);

          await API.graphql({
            query: updateUserProfileMutation,
            variables: { input: dataUpdate }
            })
          await Storage.put(data.name, image)
          // await Storage.put(data.name, image)
          console.log(image);
        }
      }
      ))
    const apiData2 = await API.graphql({ query: listUserProfiles });
    const notesFromAPI2 = apiData2.data.listUserProfiles.items;
    console.log("news")
    console.log(notesFromAPI2);
    event.target.reset();
    setImage();
  }



  return (
    <>
      <div>Profile</div>
      <img src={img} alt="here" />
      <View as="form" margin="3rem 0" onSubmit={submitPfp}>
        <View
          name="image"
          as="input"
          type="file"
          style={{ alignSelf: "end" }}
        />
        <Button type="submit" variation="primary">
            Change PFP
        </Button>
      </View>
    </>
  );
}

export default Profile;
