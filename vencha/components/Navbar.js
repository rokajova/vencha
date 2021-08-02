import Link from "next/link";
import React, { useState, useRef } from "react";
import Collapsible from "./Collapsible";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const parentRef = useRef();

  return (
    <nav>
      <a onClick={() => setIsOpen(!isOpen)}>CREATE</a>
      <div
        // className={styles.contentParent}
        ref={parentRef}
        style={
          isOpen
            ? { height: parentRef.current.scrollHeight + "px" }
            : { height: "0px" }
        }
      >
        <div>
          <form>
            <input type="text" />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
