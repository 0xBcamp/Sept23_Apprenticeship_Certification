// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your keys must be stored in .env file and do not share it over Internet
const firebaseConfig = {
  apiKey: "AIzaSyB7OaiUQIWRJI-AZ3qANPff82hLFO3zEuw",
  authDomain: "bbplatform-5b113.firebaseapp.com",
  databaseURL:
    "https://bbplatform-5b113-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "bbplatform-5b113",
  storageBucket: "bbplatform-5b113.appspot.com",
  messagingSenderId: "248722314135",
  appId: "1:248722314135:web:06df008a4fede26f92aad2",
  measurementId: "G-TB9S9MFS6G",
};

// Initialize Firebase
const realTimeApp = initializeApp(firebaseConfig);
const DBApp = initializeApp(firebaseConfig);
const realTimeDB = getDatabase(realTimeApp);
const db = getFirestore(DBApp);
export { realTimeDB, db };
