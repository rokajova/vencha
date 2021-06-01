import { useState, useEffect } from "react";
import Head from "next/head";
import firebase from "../config/firebase";
import CreatePost from "../components/CreatePost";

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

  console.log(blogs);

  return (
    <div>
      <Head>
        <title>Vents</title>
      </Head>
      <h1>All posts are here: </h1>
      <ul>
        {blogs.map((blog) => (
          <li
            style={{ border: " 1px solid black ", margin: "3px" }}
            key={blog.id}
          >
            <h2>{blog.title}</h2>
            <h3>{blog.content}</h3>
            <span>{blog.id}</span>
          </li>
        ))}{" "}
      </ul>
      <CreatePost />
    </div>
  );
};
export default Home;
