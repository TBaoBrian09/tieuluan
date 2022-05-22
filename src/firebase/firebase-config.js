import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYH8Ln65WT9sCZ7HjmiHcH4gopggHwSOE",
  authDomain: "ecommerce-website-d0cf1.firebaseapp.com",
  projectId: "ecommerce-website-d0cf1",
  storageBucket: "ecommerce-website-d0cf1.appspot.com",
  messagingSenderId: "352274167148",
  appId: "1:352274167148:web:0e660e41519a29ce116f49",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
