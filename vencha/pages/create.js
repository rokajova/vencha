import React, { useState, useRef } from "react";
import firebase from "../config/firebase";
import "firebase/storage";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createDate, setCreateDate] = useState(null);
  const [featureImage, setFeatureImage] = useState("");
  const [commentCount, setCommentCount] = useState(0);

  const inputEl = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    firebase
      .firestore()
      .collection("Vents")
      .add({ title: title, content: content });

    console.log({
      title: title,
      content: content,
    });

    setTitle("");
    setContent("");
  };

  function uploadFile() {
    var file = inputEl.current.files[0];
    var storageRef = firebase.storage().ref("Vents/" + file.name);
    var task = storageRef.put(file);

    task.on(
      "state_change",

      function error(err) {
        alert(error);
      },

      function complete() {
        alert("Upload to storage complete!" + file);
      }
    );
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
