// import firebase from "firebase";

// const firebaseConfig = {
//   apiKey: "AIzaSyAwHg0AZLPBIY5gKRAmQd9Bs3cBVdH_vr8",
//   authDomain: "vencha-b1fb9.firebaseapp.com",
//   projectId: "vencha-b1fb9",
//   storageBucket: "vencha-b1fb9.appspot.com",
//   messagingSenderId: "252827974642",
//   appId: "1:252827974642:web:521fb748ece3316d32096b",
//   measurementId: "G-0GG3DVG32T",
// };

// try {
//   firebase.initializeApp(firebaseConfig);
// } catch (err) {
//   if (!/already exists/.test(err.message)) {
//     console.error("Firebase initialization error", err.stack);
//   }
// }

// export default firebase;

// This is where we'll add all of the functions for interacting with
// Firebase services in our app.

import firebase from "firebase/app";
import "firebase/database";

const initFirebase = async () => {
  // This check prevents us from initializing more than one app.
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyAwHg0AZLPBIY5gKRAmQd9Bs3cBVdH_vr8",
      authDomain: "vencha-b1fb9.firebaseapp.com",
      projectId: "vencha-b1fb9",
      storageBucket: "vencha-b1fb9.appspot.com",
      messagingSenderId: "252827974642",
      appId: "1:252827974642:web:521fb748ece3316d32096b",
      measurementId: "G-0GG3DVG32T",
    });
  }
};

// Gets all posts from the database in reverse chronological order.
export const getPosts = async () => {
  // Because our exported functions can be called at any time from
  // any place in our app, we need to make sure we've initialized
  // a Firebase app every time these functions are invoked.
  initFirebase();

  const posts = await firebase
    .database()
    .ref("/posts")
    .orderByChild("dateCreated")
    .once("value")
    .then((snapshot) => {
      const snapshotVal = snapshot.val();

      const result = [];
      for (var slug in snapshotVal) {
        const post = snapshotVal[slug];
        result.push(post);
      }

      return result.reverse();
    });

  return posts;
};
