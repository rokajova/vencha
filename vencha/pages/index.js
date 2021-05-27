import { useEffect, useState } from "react";
import firebase from "../config/firebase";

export default function Main({ posts }) {
  return (
    <div>
      <h1>All Posts</h1>
      {posts.map((post, index) => (
        <div style={{ border: "1px solid black", margin: "10px" }} key={index}>
          {post.title}, {post.content}
          <a href={`/posts/${posts.slug}`}>Continue Reading</a>
        </div>
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  let posts = [];
  try {
    // await the promise
    const querySnapshot = await firebase.firestore().collection("blog").get();

    // "then" part after the await
    querySnapshot.forEach(function (doc) {
      posts.push({
        content: doc.data().content,
        title: doc.data().title,
      });
    });
    console.log(posts);
  } catch (error) {
    // catch part using try/catch
    console.log("Error getting documents: ", error);
    // return something else here, or an empty props, or throw an exception or whatever
  }

  return {
    props: {
      posts,
    },
  };
};
