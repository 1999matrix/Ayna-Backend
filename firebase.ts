import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBdNc5QRcm7BdjKkwH49c-8ZxTDeo7MFU0",
  authDomain: "dropbox-clone-45bf5.firebaseapp.com",
  projectId: "dropbox-clone-45bf5",
  storageBucket: "dropbox-clone-45bf5.appspot.com",
  messagingSenderId: "164990329424",
  appId: "1:164990329424:web:36f0701a031da73066a755"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };