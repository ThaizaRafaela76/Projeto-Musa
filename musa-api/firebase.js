import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { readFileSync } from "fs"
import { getStorage } from "firebase/storage"
import { cert, initializeApp as adminInitializeApp } from "firebase-admin/app"
import { getAuth as getAdminAuth } from "firebase-admin/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBXq6to3Ho0UvDnOieywIK9JBYIVZQ7WCs",
  authDomain: "projeto-musapii.firebaseapp.com",
  projectId: "projeto-musapii",
  storageBucket: "projeto-musapii.firebasestorage.app",
  messagingSenderId: "44653477754",
  appId: "1:44653477754:web:e8474e8ec9dc9e089de0c3"
}

// Firebase Client
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

// Firebase Admin
const serviceAccount = JSON.parse(readFileSync("./serviceAccountKey.json", "utf8"))

const adminApp = adminInitializeApp({
  credential: cert(serviceAccount)
})

export const adminAuth = getAdminAuth(adminApp)