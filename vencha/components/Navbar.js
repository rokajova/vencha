import Link from "next/link";
import Image from "next/image";

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
