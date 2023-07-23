import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfIYfBXFHQYwd8edQwo-0UjC9TU3KXVsE",
  authDomain: "programmers-guru.firebaseapp.com",
  projectId: "programmers-guru",
  storageBucket: "programmers-guru.appspot.com",
  messagingSenderId: "505462352111",
  appId: "1:505462352111:web:322bf2260244ad7be3531a",
  storageBucket: "gs://programmers-guru.appspot.com"
};

export const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
