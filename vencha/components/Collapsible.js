import React, { useState, useRef } from "react";
import firebase from "../config/firebase";
import "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/Collapsible.module.css";

// putting this on the backburner, need to create another website ASAP ,
// Reminder: continue by creating a grid system for the collapsible create post component
// AI art has got me hooked
const Collapsible = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featureImage, setFeatureImage] = useState("");

  const inputEl = useRef(null);
  const parentRef = useRef();

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
    setFeatureImage("");
    setIsOpen(false);
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

  const sumbitCondition = content.length > 10 || featureImage;

  return (
    <div className={styles.collapsible}>
      <button className={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
        CREATE
      </button>
      <div
        className={styles.contentParent}
        ref={parentRef}
        style={
          isOpen
            ? { height: parentRef.current.scrollHeight + "px" }
            : { height: "0px" }
        }
      >
        <div className={styles.content}>
          <form>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Content"
              value={content}
              onChange={({ target }) => setContent(target.value)}
            />
            <br />
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
            <br />
            {featureImage}
            {sumbitCondition ? (
              <button onClick={handleSubmit}>Post!</button>
            ) : (
              <button disabled>Post!</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Collapsible;
