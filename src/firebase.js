import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFAbYYSLQZbq-sA81YW-GNwMxRG5zNe8k",
  authDomain: "webmagazine-297d3.firebaseapp.com",
  projectId: "webmagazine-297d3",
  storageBucket: "webmagazine-297d3.appspot.com",
  messagingSenderId: "40082675505",
  appId: "1:40082675505:web:a23ceac3c97560e971c210",
  measurementId: "G-RQ033V5CR5"
};
// export const firebaseConfig = {
//   apiKey: FIREBASE_API_KEY,
//   authDomain: FIREBASE_AUTH_DOMAIN,
//   projectId: FIREBASE_PROJECT_ID,
//   storageBucket: FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
//   appId: FIREBASE_APP_ID,
//   measurementId: FIREBASE_MEASUREMENT_ID
// };



firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const apiKey = firebaseConfig.apiKey;
const firestore = firebase.firestore();

export { auth, apiKey, firestore };
