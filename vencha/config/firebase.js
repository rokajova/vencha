import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";
import "firebase/performance";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwHg0AZLPBIY5gKRAmQd9Bs3cBVdH_vr8",
  authDomain: "vencha-b1fb9.firebaseapp.com",
  projectId: "vencha-b1fb9",
  storageBucket: "vencha-b1fb9.appspot.com",
  messagingSenderId: "252827974642",
  appId: "1:252827974642:web:521fb748ece3316d32096b",
  measurementId: "G-0GG3DVG32T",
};

try {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase successfully initialized.");
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

export default firebase;
