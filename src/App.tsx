import React from "react";
import Router from "./router";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDWmnQxW7q8r_OC5dxiBkueulVYGl0b-Ro",
//   authDomain: "queuing-system-b3bad.firebaseapp.com",
//   projectId: "queuing-system-b3bad",
//   storageBucket: "queuing-system-b3bad.appspot.com",
//   messagingSenderId: "743235220310",
//   appId: "1:743235220310:web:a76c721afdb5aa781b9cf7",
//   measurementId: "G-G54M2M7CCD",
// };

const firebaseConfig = {
  apiKey: "AIzaSyC-W2yXlCkE_gdvGQJPTfxx11Mwi25_v2E",
  authDomain: "qeuingsystem.firebaseapp.com",
  projectId: "qeuingsystem",
  storageBucket: "qeuingsystem.appspot.com",
  messagingSenderId: "376592044161",
  appId: "1:376592044161:web:f293f8c7aa06c3bce8bd80",
  measurementId: "G-35DPS4BG70"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

function App() {
  return (
    <>
        <Router />
    </>
  );
}

export default App;
