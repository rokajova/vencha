import React, { useState, useEffect } from "react";
import firebase from "../config/firebase";

const Main = () => {
  const [posts, setPosts] = useState([]);

  // Populate posts array with firebase data, onSnapshot allows real time rendering
  const getMyPosts = () => {
    firebase
      .firestore()
      .collection("blog")
      .onSnapshot((docs) => {
        if (!docs.empty) {
          let allPosts = [];
          docs.forEach(function (doc) {
            const post = {
              id: doc.id,
              ...doc.data(),
            };
            allPosts.push(post);
          });
          setPosts(allPosts);
        }
      });
  };

  useEffect(() => {
    getMyPosts();
  });

  return (
    <div>
      {posts.map((post) => (
        <div>
          {post.title},{post.content}
        </div>
      ))}
    </div>
  );
};

export default Main;
