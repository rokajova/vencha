import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav>
      {/* <div className="logo">
        <Image src="/atlas.png" width={120} height={70} />
      </div> */}

      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/people">
        <a>People List</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
    </nav>
  );
};

export default Navbar;
