import "../config/firebase-config";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    setPersistence,
    inMemoryPersistence
} from "firebase/auth";
import { postUserRequest } from "../axiosRequests/axiosRequests";
import axios from "axios";


export default function signInwithGoogle() {

    const notificacion=async (carta) => {
        await axios.post(`/user/sendEmail`, carta );
    };

    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    const auth = getAuth();
    setPersistence(auth, inMemoryPersistence)
    .then(() => {
        signInWithPopup(auth, provider)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user) {
                let userData = {
                    email: user.email,
                    picture: user.photoURL,
                    name: user.displayName,
                };
                const email = user.email
                user.getIdToken()
                .then((tkn) => {
                    // set access token in local storage
                    notificacion({email, message:"te has registrado"})
                    localStorage.setItem("accessToken", tkn);
                    localStorage.setItem("email", email);                  
                    postUserRequest(userData)
                    window.location.replace('/HomePage')
                });
            }
        });
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