import { sendEmail } from "../axiosRequests/axiosRequests";
import {
  GoogleAuthProvider,
  getAuth,
  setPersistence,
  inMemoryPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function signIn(email, password) {
  const auth = getAuth();
  setPersistence(auth, inMemoryPersistence)
    .then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            const token = user.accessToken;
            localStorage.setItem("accessToken", token);
            localStorage.setItem("email", email)
              .then((response) => {
                console.log(response.data); // If needed, handle the server's response
              })
              .catch((error) => {
                console.error("Error sending email:", error);
              });

            window.location.replace("/HomePage");
          }
        })
        .catch((error) => {
          // Handle errors...
        });
    })
    .catch((error) => {
      // Handle errors...
    });
}
