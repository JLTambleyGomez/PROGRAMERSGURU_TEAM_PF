import "../config/firebase-config";
import { getAuth,signOut } from "firebase/auth";

export default function logoutUser() {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
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
