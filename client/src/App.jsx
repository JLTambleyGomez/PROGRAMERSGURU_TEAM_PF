import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Dark_Mode } from "./Redux/actions";
import theme from "./theme/theme";

import s from "./App.module.css";
import HomePage from "./components/views/HomePage/HomePage";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LandingPage2 from "./components/views/LandingPage/LandingPage2"
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
import Success from "./components/views/MercadopagoFeedback/Success"
import MercadoPagoFailure from "./components/views/MercadopagoFeedback/fracaso"
import MercadoPagoPendiente from "./components/views/MercadopagoFeedback/pendiente";
import MetaMaskSucces from "./components/views/MetamaskFeedback/MetamaskSucces"
import MetaMaskFailure from "./components/views/MetamaskFeedback/MetamaskFailure"
import SubscripcionesFlotante from "./components/datos/Subscripciones/SubscripcionesFlotante"
import PagoSubscripcion from "./components/views/PagoSubscripcion/PagoSubscripcion"
import Modal from "./components/views/ventanaemergente/ventana";

import axios from "axios";
// axios.defaults.baseURL = 'https://programmers-guru-db5b4f75594d.herokuapp.com/' 
axios.defaults.baseURL = 'http://localhost:3001/'  
//_________________________module_________________________
const App = () => {


    //global states:
    const shopbag = useSelector((state) => state.shopbag);
    const dark = useSelector((state) => state.darkMode)


    //states:
    const [isAtBottom, setIsAtBottom] = useState(false);

 
    //const:
    const location = useLocation().pathname;
    const dispatch = useDispatch();

    function throttle(func, delay) {
        let timeoutId;
        return function (...args) {
          if (!timeoutId) {
            timeoutId = setTimeout(() => {
              func(...args);
              timeoutId = null;
            }, delay);
          }
        };
      }

    //life-cycles:
    useEffect(() => {
        const handleScroll = () => {
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          const docHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
          );
          const windowBottom = windowHeight + window.pageYOffset;
    
          if (windowBottom >= docHeight) {
            setIsAtBottom(true);
          } else {
            setIsAtBottom(false);
          }
        };
    
        // Throttle the handleScroll function to limit event frequency
        const throttledScrollHandler = throttle(handleScroll, 200);
    
        window.addEventListener('scroll', throttledScrollHandler);
    
        // Cleanup
        return () => {
          window.removeEventListener('scroll', throttledScrollHandler);
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


    //component:
    return (
        <div className={`${s[theme("component")]}`}>
            {location !== "/" && <NavBar />}
            {location !== "/" && shopbag && <Bag/>}
            <Routes>
                <Route path="/" element={<LandingPage2/>}/>
                <Route path="/HomePage" element={<HomePage />} />
                <Route path="/CoursePage" element={<CoursePage />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Store" element={<Shop />} />
                <Route path="/Cart" element={<Cart />} />
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
                <Route path ="/IniciaSession" element ={<Modal></Modal>}/>
            </Routes>
            {location !== "/" && isAtBottom && <Footer />}
        </div>
    );
}

export default App;