import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import s from "./App.module.css";
import HomePage from "./components/views/HomePage/HomePage";
import LandingPage from "./components/views/LandingPage/LandingPage";
import CoursePage from "./components/views/CoursePage/CoursePage";
import NavBar from "./components/bars/navBar/navBar";
import Profile from "./components/views/Profile/Profile";
import Shop from "./components/views/Shop/Shop";
import Cart from "./components/views/Cart/Cart";
import Footer from "./components/bars/Footer/Footer";
import AdminPanel from "./components/views/AdminPanel/AdminPanel";
import CourseDetails from "./components/datos/CoursesDetails/CoursesDetails";
import Commingsoon from "./components/views/Commingsoon/Commingsoon";
import ProductDetail from "./components/datos/ProductDetail/ProductDetail";
import PagoMetamask from "./components/datos/PagoMetamask/PagoMetamask";
import Bag from "./components/datos/Bag/Bag";


import "./config/firebase-config";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
    setPersistence,
    inMemoryPersistence,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import axios from "axios";


//_________________________module_________________________
function App() {
  //------------------------------------------------
  //------------------------------------------------

    const postUserRequest = async (userData) => {
        try {
            const {data} = await axios.post("http://localhost:3001/user/signup", userData)
            return "usuario posteado"
        } catch (error) {
            console.log(error);
            return console.log(error.message);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            // El usuario está autenticado
            // Acciones a realizar cuando el usuario está autenticado
        console.log("el usuario fue autenticado correctamente");
 
        let userData = {
            email: user.email,
            picture: user.photoURL,
            name: user.displayName
        }
        
        postUserRequest(userData)
        

        } else {
            // El usuario no está autenticado
            // Acciones a realizar cuando el usuario no está autenticado
            console.log("el usuario no esta autenticado")
        }
        });

        return () => {
            unsubscribe(); // Se cancela la suscripción cuando el componente se desmonta
        };
    }, []);

  //------------------------------------------------
  //------------------------------------------------
    const [authorizedUser, setAuthorizedUser] = useState(
        false || sessionStorage.getItem("accessToken")
    );
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

        const auth = getAuth();

    //------------------------signInWithGoolge------------------------
    function signInwithGoogle() {
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
                        setAuthorizedUser(true);
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
    
    //------------------------------------------------
    //------------------------signInWithEmailAndPassword------------------------
    function signIn(email, password) {
        setPersistence(auth, inMemoryPersistence)
        .then(() => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user) {
                    const token = user.accessToken
                    sessionStorage.setItem("accessToken", token);
                    setAuthorizedUser(true);
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

    //------------------------------------------------
    //------------------------signInWithEmailAndPassword------------------------
    function createUser(email, password) {
        setPersistence(auth, inMemoryPersistence)
        .then(() => {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                if (user) {
                    const token = user.accessToken
                    sessionStorage.setItem("accessToken", token);
                    setAuthorizedUser(true);
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
    
    const navigate = useNavigate();

    //------------------------------------------------
    //------------------------signOut------------------------
    function logoutUser() {
        signOut(auth)
        .then(() => {
            // clear session storage
            sessionStorage.clear();
            setAuthorizedUser(false);
            // window.location.replace("/");
            navigate("/");
            alert("Logged Out Successfully");
        })
        .catch((error) => {
            // An error happened.
            alert(error);
        });
    }

  //------------------------------------------------
  //------------------------------------------------

    //global states:
    const dark = useSelector((state) => state.darkMode);
    const shopbag = useSelector((state) => state.shopbag);

    //states:
    const [changeDarkMode, setChangeDarkMode] = useState("");
    const [isAtBottom, setIsAtBottom] = useState(false);

    //const:
    const location = useLocation().pathname;

    //functions:
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };

    //life-cycles:
    useEffect(() => {
        const handleScroll = () => {
        const windowHeight =
            "innerHeight" in window
            ? window.innerHeight
            : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset;

        if (windowBottom >= docHeight) {
            setIsAtBottom(true);
        } else {
            setIsAtBottom(false);
        }
        };
        window.addEventListener("scroll", handleScroll);
        //--desmontado
        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

  //component:
  return (
        <div className={`${s[theme("component")]}`}>
            {location !== "/" && <NavBar logoutUser={logoutUser} />}
            {location !== "/" && shopbag && <Bag/>}
            <Routes>
                <Route
                path="/"
                element={
                    <LandingPage
                    signInwithGoogle={signInwithGoogle}
                    createUser={createUser}
                    signIn={signIn}
                    authorizedUser={authorizedUser}
                    setAuthorizedUser={setAuthorizedUser}
                    />
                }
                />
                <Route
                path="/HomePage"
                element={<HomePage token={sessionStorage.getItem("accessToken")} />}
                />
                <Route path="/CoursePage" element={<CoursePage />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Store" element={<Shop />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/AdminPanel" element={<AdminPanel />} />
                <Route path="/CourseDetails/:id" element={<CourseDetails />} />
                <Route path="/Commingsoon" element={<Commingsoon />} />
                <Route path="/ProductDetail/:id" element={<ProductDetail />} />
                <Route path="/PruebaMetamask" element={<PagoMetamask />} />

                
            </Routes>
            {isAtBottom && <Footer />}
        </div>
    );
}

export default App;
