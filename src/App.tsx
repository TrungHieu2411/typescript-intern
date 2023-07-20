import React from "react";
import Router from "./router";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyC-W2yXlCkE_gdvGQJPTfxx11Mwi25_v2E",
//   authDomain: "qeuingsystem.firebaseapp.com",
//   projectId: "qeuingsystem",
//   storageBucket: "qeuingsystem.appspot.com",
//   messagingSenderId: "376592044161",
//   appId: "1:376592044161:web:f293f8c7aa06c3bce8bd80",
//   measurementId: "G-35DPS4BG70"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAGwEzRPXgUH1BHHzI9n7_sddyf_R5ARuM",
  authDomain: "qeuingsystem-14000.firebaseapp.com",
  projectId: "qeuingsystem-14000",
  storageBucket: "qeuingsystem-14000.appspot.com",
  messagingSenderId: "510878111082",
  appId: "1:510878111082:web:fd2cce60dd86946a138113",
  measurementId: "G-S4VB9VDYH1"
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
