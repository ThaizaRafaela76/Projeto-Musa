import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXq6to3Ho0UvDnOieywIK9JBYIVZQ7WCs",
  authDomain: "projeto-musapii.firebaseapp.com",
  projectId: "projeto-musapii",
  storageBucket: "projeto-musapii.firebasestorage.app",
  messagingSenderId: "44653477754",
  appId: "1:44653477754:web:e8474e8ec9dc9e089de0c3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);