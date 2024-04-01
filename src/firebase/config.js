// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_DATABASEURL,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,

} = getEnvironments();
// para produccion
// const firebaseConfig = {
//   apiKey: "AIzaSyBaNIFRvKC84aNSNU03VaWTdCrn2ClsVvA",
//   authDomain: "react-curso-15f95.firebaseapp.com",
//   projectId: "react-curso-15f95",
//   storageBucket: "react-curso-15f95.appspot.com",
//   messagingSenderId: "681101673045",
//   appId: "1:681101673045:web:24e02f87f521056aaf4adc"
// };

// testing
// const firebaseConfig = {
//   apiKey: "AIzaSyBIFMCUhxbxOsYl0mPw4PCpv5uh_j48AHo",
//   authDomain: "react-testing-17301.firebaseapp.com",
//   projectId: "react-testing-17301",
//   storageBucket: "react-testing-17301.appspot.com",
//   messagingSenderId: "821707708910",
//   appId: "1:821707708910:web:52834672f29362d42dd6ff"
// };

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  databaseURL: VITE_DATABASEURL,
  projectId: VITE_PROJECTID,
  storageBucket:VITE_STORAGEBUCKET ,
  messagingSenderId:VITE_MESSAGINGSENDERID ,
  appId: VITE_APPID,
};

// console.log(firebaseConfig);

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );