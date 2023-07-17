import axios from "axios";
import "../config/firebase-config";
import {
    GoogleAuthProvider,
    getAuth,
    setPersistence,
    inMemoryPersistence,
    createUserWithEmailAndPassword,
} from "firebase/auth";


//_________________________module_________________________
const postUserRequest = async (userData) => {
    try {
        const { data } = await axios.post(
            "http://localhost:3001/user/signup",
            userData
        );
        return data.message;
    } catch (error) {
        console.log(error);
        return console.log(error.message);
    }
};

export default function createUser(email, password) {
    const auth = getAuth();
    setPersistence(auth, inMemoryPersistence)
        .then(() => {
            createUserWithEmailAndPassword(auth, email, password).then(
                (userCredential) => {
                    const user = userCredential.user;
                    if (user) {
                        let userData = {
                            email: user.email,
                            picture: user.photoURL,
                            name: user.displayName,
                        };
                        const token = user.accessToken;
                        sessionStorage.setItem("accessToken", token);
                        sessionStorage.setItem("email", email)
                        postUserRequest(userData)
                        window.location.replace("/HomePage");
                    }
                }
            );
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