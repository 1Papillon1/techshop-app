import firebase from "firebase/compat/app";
import "firebase/compat/firestore";






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







export default app;



