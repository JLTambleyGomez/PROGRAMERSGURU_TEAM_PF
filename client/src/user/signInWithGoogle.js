import "../config/firebase-config";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    setPersistence,
    inMemoryPersistence
} from "firebase/auth";

export default function signInwithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    const auth = getAuth();
    setPersistence(auth, inMemoryPersistence)
    .then(() => {
        signInWithPopup(auth, provider)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user) {
                user.getIdToken()
                .then((tkn) => {
                    // set access token in session storage
                    sessionStorage.setItem("accessToken", tkn);
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