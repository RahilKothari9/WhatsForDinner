
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC6u53Xathb8tgVyBXadCP5UuGcuZW5vFY",
  authDomain: "whatsfordinner-f7a4b.firebaseapp.com",
  projectId: "whatsfordinner-f7a4b",
  storageBucket: "whatsfordinner-f7a4b.appspot.com",
  messagingSenderId: "122865874158",
  appId: "1:122865874158:web:a812b075b7f6b4b49eefff",
  measurementId: "G-72SW30VR1C"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);