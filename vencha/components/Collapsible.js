import React, { useState, useRef } from "react";
import styles from "../styles/Collapsible.module.css";

function Collapsible(props) {
  const [isOpen, setIsOpen] = useState(false);

  const parentRef = useRef();

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
            <input type="text" />
          </form>
        </div>
      </div>
    </div>
  );
}
export default Collapsible;
