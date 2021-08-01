import React, { useState } from "react";
import styles from "../styles/Collapsible.module.css";

function Collapsible(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.collapsible}>
      <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
        {props.label}
      </button>
      {isOpen && <div className={styles.content}>{props.children}</div>}
    </div>
  );
}
export default Collapsible;
