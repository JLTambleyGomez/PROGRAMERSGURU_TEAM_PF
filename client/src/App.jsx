import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Dark_Mode } from "./Redux/actions";
import theme from "./theme/theme";

import s from "./App.module.css";
import About from "./components/views/About/About";
import HomePage from "./components/views/HomePage/HomePage";
import LandingPage2 from "./components/views/LandingPage/LandingPage2"
import CoursePage from "./components/views/CoursePage/CoursePage";
import NavBar from "./components/bars/navBar/navBar";
import Profile from "./components/views/Profile/Profile";
import Shop from "./components/views/Shop/Shop";
import Cart from "./components/views/Cart/Cart";
import Footer from "./components/bars/Footer/Footer";
import AdminPanel from "./components/views/AdminPanel/AdminPanel";
import Commingsoon from "./components/views/Commingsoon/Commingsoon";
import ProductDetail from "./components/datos/ProductDetail/ProductDetail";
import PagoMetamask from "./components/datos/PagoMetamask/PagoMetamask";
import Bag from "./components/datos/Bag/Bag";
import Success from "./components/views/MercadopagoFeedback/Success"
import MercadoPagoFailure from "./components/views/MercadopagoFeedback/fracaso"
import MercadoPagoPendiente from "./components/views/MercadopagoFeedback/pendiente";
import MetaMaskSucces from "./components/views/MetamaskFeedback/MetamaskSucces"
import MetaMaskFailure from "./components/views/MetamaskFeedback/MetamaskFailure"
import PagoSubscripcion from "./components/views/PagoSubscripcion/PagoSubscripcion"
import Modal from "./components/views/ventanaemergente/ventana";
import ModalBannedUser from "./components/views/ModalBannedUser/ModalBannedUser";
import CourseDetails from "./components/datos/CoursesDetails/CourseDetails";
import MusicBar from "./components/bars/musicBar/MusicBar";


import { getAuth } from "firebase/auth";
import "./config/firebase-config";



//_________________________module_________________________
const App = () => {
const dispatch = useDispatch()

const auth = getAuth();


auth.onIdTokenChanged(async (user) => {
    if (user) {
        try {
        // Obtiene el token de autenticación actual
        const token = await user.getIdToken();

        // Verificar los valores antes del cálculo
        console.log("user.authTime:", user.authTime);
        console.log("Token actual:", token);
        console.log("User object:", user);

        const createdAt = user.metadata.createdAt;

        // Programe la renovación del token antes de que expire (por ejemplo, 5 minutos antes)
        const tokenExpirationTime = createdAt * 1.0002 - (20 * (60 *60 *1000)) + 7 * (60 * 1000) + 25000; // 1 hora - 5 minutos
        const currentTime = Date.now();
        console.log(user.metadata);

        // Verificar los valores después del cálculo
        console.log("tokenExpirationTime:", tokenExpirationTime);
        console.log("Tiempo actual:", new Date(currentTime).toLocaleString());
        console.log("Tiempo de expiración del token:", new Date(tokenExpirationTime).toLocaleString());

        if (currentTime >= tokenExpirationTime) {
            // Renueva el token
            console.log("Renovando el token...");
            const refreshedToken = await user.getIdToken(true);
            console.log("Renovado")
            localStorage.setItem("accessToken", refreshedToken);
            console.log("Token renovado:", refreshedToken);
            // Puedes guardar el nuevo token en local o en el estado de la aplicación para usarlo en las solicitudes posteriores
        }
        } catch (error) {
        // Manejo de errores
        console.error("Error al renovar el token:", error);
        }
    }
});


    //global states:
    
    const dark = useSelector((state) => state.darkMode);
    const shopbag = useSelector((state) => state.shopbag);
    const user= useSelector((state)=>state.user);


    //states:
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [isBanned, setBan]= useState(false);
    
    //const:
    const location = useLocation().pathname;
    const storeRef = useRef(null)
    const docWidth = window.innerWidth

    
    //life-cycles:
    useEffect(()=>{
        if(user.name){
            if(user.banned){ setBan(true)}
        }
        setBan(false)
    },[user])

    
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

    useEffect(() => {
        //default darkMode theme: false
        const darkModeLocal = localStorage.getItem("darkMode")
        if (!darkModeLocal) {
            localStorage.setItem("darkMode", "false")
        }
    }, [])

    useEffect(() => {
        dispatch(Dark_Mode())
    }, [dark])

    //rule:
    if(isBanned) return(
        <Routes>
            <Route path="/HomePage" elment={<ModalBannedUser/>}/>
            <Route path="/" element={<LandingPage2/>}/>
        </Routes>
    )


    //component:
    return (
        <div className={`${s.component} ${s[theme("component")]}`}>
            {location !== "/" && <NavBar storeRef={storeRef}/>}
            {location !== "/" && <MusicBar/>}
            {location !== "/" && shopbag && <Bag/>}
            <Routes>
                <Route path="/" element={<LandingPage2/>}/>
                <Route path="/HomePage" element={<HomePage storeRef={storeRef} isAtBottom={isAtBottom} docWidth={docWidth}/>} />
                <Route path="/CoursePage" element={<CoursePage isAtBottom={isAtBottom} docWidth={docWidth}/>} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Store" element={<Shop isAtBottom={isAtBottom} docWidth={docWidth}/>} />
                <Route path="/Cart" element={<Cart isAtBottom={isAtBottom} docWidth={docWidth}/>} />
                <Route path="/AdminPanel" element={<AdminPanel />} />
                <Route path="/CourseDetails/:id" element={<CourseDetails />} />
                <Route path="/Commingsoon" element={<Commingsoon />} />
                <Route path="/ProductDetail/:id" element={<ProductDetail />} />
                <Route path="/PruebaMetamask" element={<PagoMetamask />} />
                <Route path="/MercadoPagoFeedback" element={<Success/>} />
                <Route path ="/MercadoPagoFailure" element ={<MercadoPagoFailure/>}/>
                <Route path ="/MercadoPagoPending" element ={<MercadoPagoPendiente/>}/>
                <Route path="/MetamaskSuccess" element = {<MetaMaskSucces/>}/>
                <Route path ="/MetaMaskFailure" element = {<MetaMaskFailure/>}/>
                <Route path ="/PagoSubscripcion" element = {<PagoSubscripcion/>}/>
                <Route path ="/IniciaSession" element ={<Modal/>}/>
                <Route path ="/about" element = {<About/>}/>
            </Routes>
            {/* {location === "/HomePage" && isAtBottom && <Footer />} */}
        </div>
    );
}

export default App;