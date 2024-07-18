import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIrq3jrqeSHOOC-J_g31FLbHh9fhRXtTo",
  authDomain: "chat-app-ca301.firebaseapp.com",
  projectId: "chat-app-ca301",
  storageBucket: "chat-app-ca301.appspot.com",
  messagingSenderId: "365404581577",
  appId: "1:365404581577:web:4d0135bfb9eb4819852718",
  measurementId: "G-E5G4FTZGEC",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
export default firebase;
