// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFAbYYSLQZbq-sA81YW-GNwMxRG5zNe8k",
  authDomain: "webmagazine-297d3.firebaseapp.com",
  projectId: "webmagazine-297d3",
  storageBucket: "webmagazine-297d3.appspot.com",
  messagingSenderId: "40082675505",
  appId: "1:40082675505:web:a23ceac3c97560e971c210",
  measurementId: "G-RQ033V5CR5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
