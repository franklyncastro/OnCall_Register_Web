import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbnNGr762H1VBgIEFHnKiV2TEqtnQ1jFk",
  authDomain: "oncallapp-9451c.firebaseapp.com",
  projectId: "oncallapp-9451c",
  storageBucket: "oncallapp-9451c.firebasestorage.app",
  messagingSenderId: "1089547389630",
  appId: "1:1089547389630:web:b8e317a73146b2a679acef"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


