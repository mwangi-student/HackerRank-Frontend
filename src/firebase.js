// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9sqTN3SNAzI39_R5Xnmmkq0XOwdsXI2s",
  authDomain: "hackerrank-project.firebaseapp.com",
  projectId: "hackerrank-project",
  storageBucket: "hackerrank-project.firebasestorage.app",
  messagingSenderId: "1062706981130",
  appId: "1:1062706981130:web:1fdcc0ef8597987ed9b2f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);