import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const closeModalHandler = () => setShow(false);
  return (
    <nav>
      <Link href="/create">
        <a>CREATE</a>
      </Link>
    </nav>
  );
};

export default Navbar;
