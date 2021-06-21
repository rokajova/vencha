import React, { useState } from "react";
import firebase from "../config/firebase";
import MediaUpload from "./MediaUpload";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notification, setNotification] = useState("");

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
    setNotification("Vent created!");

    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  return (
    <div>
      <h2>Add Blog</h2>
      {notification}
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
        </div>

        <MediaUpload />
      </form>
    </div>
  );
};

export default CreatePost;
