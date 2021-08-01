import Link from "next/link";
import React, { useState } from "react";
import Collapsible from "./Collapsible";

const Navbar = () => {
  return (
    <nav>
      <Collapsible label="CREATE"></Collapsible>
    </nav>
  );
};

export default Navbar;
