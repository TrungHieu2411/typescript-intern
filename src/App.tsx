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
  apiKey: "AIzaSyDSqLvXi8FU9x8ePSboYQ-bP7ZJCOHu2rc",
  authDomain: "queingsystem-6397d.firebaseapp.com",
  projectId: "queingsystem-6397d",
  storageBucket: "queingsystem-6397d.appspot.com",
  messagingSenderId: "983226810451",
  appId: "1:983226810451:web:0610506483491b1b9106a6",
  measurementId: "G-Y4EK3PV8WH"
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
