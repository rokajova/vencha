import { useState, useEffect } from "react";
import firebase from "../config/firebase";
import Link from "next/link";
import styles from "../styles/Main.module.css";

// I'm feeling sick, fuck this weather honestly
const timeStampToString = (ts) => {
  const date = new Date(ts * 1000);
  return (
    date.getFullYear() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getDate() +
    " " +
    (date.getHours() < 10 ? "0" : "") +
    date.getHours() +
    ":" +
    (date.getMinutes() < 10 ? "0" : "") +
    date.getMinutes() +
    ":" +
    (date.getSeconds() < 10 ? "0" : "") +
    date.getSeconds()
  );
};

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  // Populates blogs array array with data from Vents collection in the db.
  useEffect(() => {
    firebase
      .firestore()
      .collection("Vents")
      .orderBy("createDate", "desc")
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
      <ul>
        {/* prints out every element in populated array */}
        {blogs.map((blog) => (
          <div key={blog.id}>
            <Link href="/vent/[id]" as={"/vent/" + blog.id}>
              <a itemProp="hello">{blog.title}</a>
            </Link>
            <span>
              Created:{" "}
              <strong>{timeStampToString(blog.createDate.seconds)}</strong>
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
};
export default Home;
