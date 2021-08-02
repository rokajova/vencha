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
            <input type="text" placeholder="Title" />
            <input type="file" />
            <input type="text" placeholder="Vent" />
          </form>
        </div>
      </div>
    </div>
  );
}
export default Collapsible;
