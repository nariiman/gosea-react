// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUH-zwbd2fePxhrGuIzxZv_PzMy9l_nNg",
  authDomain: "reservations-b97ef.firebaseapp.com",
  projectId: "reservations-b97ef",
  storageBucket: "reservations-b97ef.firebasestorage.app",
  messagingSenderId: "289205608570",
  appId: "1:289205608570:web:53f3393563c2caf9da1bc3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
