// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvwAm6DpB4vBW-fGQHzTNiBQxCE_cULGY",
  authDomain: "youngjin-s-portfolio.firebaseapp.com",
  projectId: "youngjin-s-portfolio",
  storageBucket: "youngjin-s-portfolio.appspot.com",
  messagingSenderId: "35148854003",
  appId: "1:35148854003:web:fb27fa99ce264f8c657d86",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const fauth = getAuth();
export const fstore = getFirestore();
export const fstorage = getStorage();
