import React, { useState, useRef } from "react";
import firebase from "../config/firebase";
import "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const CreatePost = () => {
  // warning will be used for file size limit
  const [isImageWarningOpen, setIsImageWarningOpen] = useState(false);
  // required states that will be used in a post
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featureImage, setFeatureImage] = useState("");

  const inputEl = useRef(null);

  //  Adds the content to the database, resets the input fields to empty
  const handleSubmit = (event) => {
    event.preventDefault();

    firebase.firestore().collection("Vents").add({
      title: title,
      content: content,
      createDate: new Date(),
      commentCount: 0,
      featureImage: featureImage,
    });

    console.log({
      title: title,
      content: content,
      image: featureImage,
    });

    setTitle("");
    setContent("");
  };

  //  Adds the files to storage under a uuid in Vents folder, gets URL for added files to be stored in featureImage state
  function uploadFile() {
    return new Promise(async (resolve, reject) => {
      var file = inputEl.current.files[0];
      var fileName = uuidv4();
      firebase
        .storage()
        .ref("Vents/" + fileName)
        .put(file)
        .then(async (snapshot) => {
          var downloadURL = await firebase
            .storage()
            .ref("Vents/" + fileName)
            .getDownloadURL();
          resolve({ success: true, data: { link: downloadURL } });
        })
        .catch((err) => setIsImageWarningOpen(true, () => console.log(err)));
    });
  }

  const sumbitCondition = title || content || featureImage;

  return <div></div>;
};

export default CreatePost;
