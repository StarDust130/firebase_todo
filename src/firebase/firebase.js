
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYQTcOdzZ11ou4FmXnAfuPatr1OBG7uGY",
  authDomain: "fir-todo-project-5ad5e.firebaseapp.com",
  projectId: "fir-todo-project-5ad5e",
  storageBucket: "fir-todo-project-5ad5e.appspot.com",
  messagingSenderId: "321176375912",
  appId: "1:321176375912:web:21014440c9c4577f52a1dd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//! I add auth and db to use them in other files
export const auth = getAuth(app);
export const db = getFirestore(app);
