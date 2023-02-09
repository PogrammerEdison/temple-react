import React, { useState, useEffect } from "react";
import { getImg } from "./Database";
import { API, Storage } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
} from "@aws-amplify/ui-react";

function Profile(props) {
  const [img, setImg] = useState("");

  useEffect(() => {
    setImage();
  }, []);

  async function setImage() {
    console.log(getImg(props.username));
    let stuff = await getImg(props.username);
    setImg(stuff);
  }

  async function changePfp() {
    console.log(getImg(props.username));
    let stuff = await getImg(props.username);
    setImg(stuff);
  }

  async function submitPfp(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: props.username,
      image: image.name,
    };
    await Storage.remove(data.name);
    await Storage.put(data.name, image);
    setImage();
    event.target.reset();
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
