import React, { useState } from "react";
import styles from "../styles/Collapsible.module.css";

function Collapsible() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.collapsible}>
      <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </button>
      {isOpen && <div className={styles.content}>Collapsible</div>}
    </div>
  );
}
export default Collapsible;
