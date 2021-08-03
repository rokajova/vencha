import Link from "next/link";
import React, { useState } from "react";
import Collapsible from "./Collapsible";

const Navbar = () => {
  return (
    <nav>
      <Link href="/create">
        <a>CREATE</a>
      </Link>
    </nav>
  );
};

export default Navbar;
