import { listUserProfiles } from "../graphql/queries";
import React, { useState } from "react";
import { API, Storage } from "aws-amplify";

var image = "undefined"
export async function getImg(username) {

    const apiData = await API.graphql({ query: listUserProfiles });
    console.log(apiData);
    const notesFromAPI = apiData.data.listUserProfiles.items;
    console.log(notesFromAPI);
    await Promise.all(
      notesFromAPI.map(async (user) => {
        if (user.name == username) {
          console.log(user.image);
          image = await Storage.get(user.name);
        }
      })
    );
  return image
}
