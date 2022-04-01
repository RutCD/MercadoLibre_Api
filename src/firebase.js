import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

let fireConfig = {
  apiKey: "AIzaSyAgRQeyQYrbkaJaq02lAMP29ZSubfUmby0",

  authDomain: "trabajoproyectoti-31.firebaseapp.com",

  projectId: "trabajoproyectoti-31",

  storageBucket: "trabajoproyectoti-31.appspot.com",

  messagingSenderId: "670518499779",

  appId: "1:670518499779:web:063f2a0657e42d5abb0576",

  measurementId: "G-71YYC13KQW",
};

firebase.initializeApp(fireConfig);

const db = firebase.firestore();
const auth = firebase.auth()

export {db, auth};
