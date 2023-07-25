import {
  GoogleAuthProvider,
  getAuth,
  setPersistence,
  inMemoryPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function signIn(email, password) {
    //const dispatch = useDispatch();

    const auth = getAuth();
    setPersistence(auth, inMemoryPersistence)
        .then(() => {
            signInWithEmailAndPassword(auth, email, password).then(
                (userCredential) => {
                    console.log({userCredential})
                    const user = userCredential.user;
                    

                    if (user) {
                        const token = user.accessToken;
                       
                        localStorage.setItem("accessToken", token);
                        localStorage.setItem("email", email);
                        // window.location.replace("/HomePage");
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
