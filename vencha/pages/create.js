import React, { useState, useRef } from "react";
import firebase from "../config/firebase";
import "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featureImage, setFeatureImage] = useState("");

  const inputEl = useRef(null);

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
    });

    setTitle("");
    setContent("");
  };

  function uploadFile() {
    var file = inputEl.current.files[0];
    var fileName = uuidv4();
    var storageRef = firebase
      .storage()
      .ref("Vents/" + fileName)
      .put(file)
      .then(async (snapshot) => {
        const downloadURL = await storageRef
          .ref("Vents/" + fileName)
          .getDownloadURL();
        setFeatureImage(downloadURL);
        console.log(featureImage);
      });
  }

  return (
    <div>
      <h2>Add Blog</h2>
      <form>
        <div>
          Title
          <br />
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          Content
          <br />
          <textarea
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
          <input type="file" onChange={uploadFile} ref={inputEl} />
          <button onClick={handleSubmit}>Post!</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
