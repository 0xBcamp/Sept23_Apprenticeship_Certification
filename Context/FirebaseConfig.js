// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_APIKEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
//   databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
//   projectId: process.env.NEXT_PUBLIC_PROJECTID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
//   appId: process.env.NEXT_PUBLIC_APPID,
//   measurementId: process.env.NEXT_PUBLIC_MEAUSREMENTID,
// };
