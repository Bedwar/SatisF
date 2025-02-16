import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from "@env";

const firebaseConfig = {
  apiKey: "AIzaSyDNbXmoI7oSjNvTBPEnlbuuf6mcF6SpqHw",
  authDomain: "satisf-bf31c.firebaseapp.com",
  projectId: "satisf-bf31c",
  storageBucket: "satisf-bf31c.firebasestorage.app",
  messagingSenderId: "53019089751",
  appId: "1:53019089751:web:28f44725111ce7d9b4fc12"
};



const app = initializeApp(firebaseConfig);
const auth_mod = getAuth(app);

export default auth_mod;
export { app };