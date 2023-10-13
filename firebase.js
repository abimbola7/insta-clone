// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBh5ZcOP88qEUAaSHLilK8mVy-xflWAHo",
  authDomain: "insta-clone-86239.firebaseapp.com",
  projectId: "insta-clone-86239",
  storageBucket: "insta-clone-86239.appspot.com",
  messagingSenderId: "339880947881",
  appId: "1:339880947881:web:9beff43c1f5bcd36a939b8"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };