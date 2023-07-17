import "../config/firebase-config";
import { getAuth, signOut } from "firebase/auth";


//_________________________module_________________________
export default function logoutUser () {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            //clear local storage
            localStorage.clear();
            // clear session storage
            sessionStorage.clear();
        }).then(() => {
            window.location.replace("/");
        })
        .catch((error) => {
            // An error happened.
            alert(error);
        });
}
