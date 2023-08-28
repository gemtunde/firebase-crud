// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKUdzap8WnBeUcCa3hB3fA3ohTT-vah38",
  authDomain: "fir-crud-e6521.firebaseapp.com",
  projectId: "fir-crud-e6521",
  storageBucket: "fir-crud-e6521.appspot.com",
  messagingSenderId: "157899410990",
  appId: "1:157899410990:web:84e73e07f808b7b7b419bf",
  measurementId: "G-3M456KC510",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//const analytics = getAnalytics(app);

//google-auth
export const googleProvider = new GoogleAuthProvider();

//get details from firestore
export const db = getFirestore(app);

//connect firebase storage
export const storage = getStorage(app);
