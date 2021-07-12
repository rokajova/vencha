import { useState, useEffect } from "react";
import Head from "next/head";
import firebase from "../config/firebase";
import Link from "next/link";

// I'm feeling sick, fuck this weather honestly
const Home = () => {
  const [blogs, setBlogs] = useState([]);

  // Populates blogs array array with data from Vents collection in the db.
  useEffect(() => {
    firebase
      .firestore()
      .collection("Vents")
      .onSnapshot((snap) => {
        const blogs = snap.docs.map((doc) => ({
          // get the unique doc from firestore doc, this will be the post url
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogs);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Vents</title>
      </Head>
      <Link href="/create">Create</Link>
      <h1>All posts are here: </h1>
      <ul>
        {/* prints out every element in populated array */}
        {blogs.map((blog) => (
          <li
            key={blog.id}
            style={{ border: "1px solid black", margin: "10px" }}
          >
            <Link href="/vent/[id]" as={"/vent/" + blog.id}>
              <a itemProp="hello">{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Home;
