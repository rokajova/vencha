import React, { useState } from "react";
import firebase from "../config/firebase";
import { v4 as uuidv4 } from "uuid";

const MediaUpload = () => {
  const uploadImageCallback = (e) => {
    return new Promise(async (resolve, reject) => {
      const file = e.target.files[0];
      const fileName = uuidv4();
      firebase
        .firestore()
        .ref()
        .child("Vents/" + fileName)
        .put(file)
        .then(async (snapshot) => {
          const downLoadURL = await firebase
            .firestore()
            .ref()
            .child("Vents/" + fileName)
            .getDownloadURL();
          const extension = await firebase
            .firestore()
            .ref()
            .child("Vents/" + fileName)
            .getMetadata();
          resolve({
            success: true,
            data: { link: downLoadURL, fileExtension: extension.contentType },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={async (e) => {
          const uploadState = await uploadImageCallback(e);
          if (uploadState.success) {
            console.log("Feature file uploaded!");
          } else {
            console.log("Feature image upload failed");
          }
        }}
      />
    </div>
  );
};

export default MediaUpload;
