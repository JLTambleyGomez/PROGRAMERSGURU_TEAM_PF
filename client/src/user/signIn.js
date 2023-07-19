import "../config/firebase-config";
import {
    GoogleAuthProvider,
    getAuth,
    setPersistence,
    inMemoryPersistence,
    signInWithEmailAndPassword
} from "firebase/auth";

import axios from "axios";
//_________________________module_________________________
export default function signIn(email, password) {
    const notificacion=async (carta) => {
        await axios.post(`http://localhost:3001/user/sendEmail`, carta );
    };


    const auth = getAuth();
    setPersistence(auth, inMemoryPersistence)
    .then(() => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user) {
                const token = user.accessToken
                notificacion({email, message:"te has registrado"})
                localStorage.setItem("accessToken", token);
                localStorage.setItem("email", email)
                window.location.replace('/HomePage')
            }
        })
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        return [errorCode, errorMessage, email, credential];
    });
}