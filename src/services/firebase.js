import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import { initFirestorter } from 'firestorter';





const firebaseConfig = {
  apiKey: "AIzaSyCxxRd737rx-iOTrMUFb8vvqB7GopECDQA",
  authDomain: "techshop-app.firebaseapp.com",
  projectId: "techshop-app",
  storageBucket: "techshop-app.appspot.com",
  messagingSenderId: "94035926293",
  appId: "1:94035926293:web:285218869efa3940cfdd1c",
  measurementId: "G-XBL9LBR7CY"
  };


const app = firebase.initializeApp(firebaseConfig);


/*
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/




export default app;



