import firebase from "firebase/app";
import  "firebase/analytics";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBr-uehikECwhshCVN9nBv6JTX5JtrKx3Q",
    authDomain: "programersguru-team-pf.firebaseapp.com",
    projectId: "programersguru-team-pf",
    storageBucket: "programersguru-team-pf.appspot.com",
    messagingSenderId: "659346313768",
    appId: "1:659346313768:web:ecef27e0ee673429621b1d",
    measurementId: "G-025WPW5RKD"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);