import React, { useState, useRef } from "react";
import firebase from "../config/firebase";
import "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const CreatePost = () => {
  const [isImageWarningOpen, setIsImageWarningOpen] = useState(false);
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
      image: featureImage,
    });

    setTitle("");
    setContent("");
  };

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
          <input
            type="file"
            onChange={async (e) => {
              const uploadState = await uploadFile();
              if (uploadState.success) {
                setFeatureImage(uploadState.data.link);
              }
              console.log("File uploaded!");
            }}
            ref={inputEl}
          />
          {sumbitCondition ? (
            <button onClick={handleSubmit}>Post!</button>
          ) : (
            <button disabled>Post!</button>
          )}
          {featureImage}
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
