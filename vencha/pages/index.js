import { useState, useEffect } from "react";
import firebase from "../config/firebase";
import Link from "next/link";
import styles from "../styles/Main.module.css";
import Modal from "react-bootstrap/Modal";

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
  const [orderBy, setOrderBy] = useState("createDate");

  // Populates blogs array array with data from Vents collection in the db.
  useEffect(() => {
    firebase
      .firestore()
      .collection("Vents")
      .orderBy(orderBy, "desc")
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
    <div className={styles.container}>
      {/* prints out every element in populated array */}
      <div>
        Sort by:
        <button onClick={() => setOrderBy("createDate")}>New</button>
        <button onClick={() => setOrderBy("title")}>Old</button>
      </div>
      {blogs.map((blog) => (
        <Link href="/vent/[id]" as={"/vent/" + blog.id}>
          <div className={styles.post} key={blog.id}>
            <img src={blog.featureImage} />
            <a itemProp="hello">{blog.title}</a>
            <p>{blog.content}</p>
            <h3>{timeStampToString(blog.createDate.seconds)}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default Home;
