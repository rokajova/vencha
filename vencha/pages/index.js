import { useState, useEffect } from "react";
import Head from "next/head";
import firebase from "../config/firebase";
import Link from "next/link";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

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
      <h1>All posts are here: </h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
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
