// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import "firebase/auth";

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA_Fsu92Wj5LAn9IjIEgXwRrF1SN6lRU3Y",
    authDomain: "nowaitlist-7f026.firebaseapp.com",
    projectId: "nowaitlist-7f026",
    storageBucket: "nowaitlist-7f026.appspot.com",
    messagingSenderId: "29046811405",
    appId: "1:29046811405:web:0eb72befa81463162a5e44"
  };
  // Initialize Firebase

  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }
  export default firebase;

