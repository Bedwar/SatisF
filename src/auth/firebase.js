import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5shBL7KAemodeAKXwiOKpdRcSaFwZlRg",
  authDomain: "mobilesatisfy.firebaseapp.com",
  projectId: "mobilesatisfy",
  storageBucket: "mobilesatisfy.firebasestorage.app",
  messagingSenderId: "830117828836",
  appId: "1:830117828836:web:7d5456e6d9b944e746f4f1",
  measurementId: "G-16MBCG3P5Q"

};

const app = initializeApp(firebaseConfig);
const auth_mod = getAuth(app);

export default auth_mod;