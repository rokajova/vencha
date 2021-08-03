import React, { useState, useRef } from "react";
import firebase from "../config/firebase";
import "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/Collapsible.module.css";

function Collapsible(props) {
  // state for collapsible managment
  const [isOpen, setIsOpen] = useState(false);
  // warning will be used for file size limit
  const [isImageWarningOpen, setIsImageWarningOpen] = useState(false);
  // required states that will be used in a post
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featureImage, setFeatureImage] = useState("");
  // used for collapsible height calculation
  const parentRef = useRef();
  // used for ???
  const inputEl = useRef();

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
    setFeatureImage("");
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

  // condition under which I can submit the post
  const sumbitCondition = title || content || featureImage;

  return (
    <div>
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
            <div>
              <input
                placeholder="Title..."
                type="text"
                value={title}
                onChange={(target) => setTitle(target.value)}
              />
            </div>
            <div>
              <textarea
                placeholder="Vent..."
                value={content}
                onChange={(target) => {
                  setContent(target.value);
                }}
              />
            </div>
            <div>
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
            </div>
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
}
export default Collapsible;
