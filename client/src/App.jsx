import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./components/views/HomePage/HomePage";
import LandingPage from "./components/views/LandingPage/LandingPage";
import CoursePage from "./components/views/CoursePage/CoursePage";
import NavBar from "./components/bars/navBar/navBar";
import Perfil from "./components/views/Perfil/Perfil";
import Compras from "./components/views/Compras/Compras";
import styles from "./App.module.css";
import AdminPanel from "./components/views/AdminPanel/AdminPanel";
import CourseDetails from "./components/datos/CoursesDetails/CoursesDetails";
import React, { useState, useEffect } from "react";
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
import Success from "./components/views/MercadopagoFeedback/Success";
import MercadoPagoFailure from "./components/views/MercadopagoFeedback/fracaso";
import MercadoPagoPendiente from "./components/views/MercadopagoFeedback/pendiente";
import MetaMaskSucces from "./components/views/MetamaskFeedback/MetamaskSucces";
import MetaMaskFailure from "./components/views/MetamaskFeedback/MetamaskFailure";
import SubscripcionesFlotante from "./components/datos/Subscripciones/SubscripcionesFlotante";
import PagoSubscripcion from "./components/views/PagoSubscripcion/PagoSubscripcion";

//_________________________module_________________________
function App() {
  //const:
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [changeDarkMode, setChangeDarkMode] = useState("");
  const darkmode = useSelector((state) => state.darkMode);

  useEffect(() => {
    if (darkmode === true) {
      setChangeDarkMode("darkContainer");
    } else {
      setChangeDarkMode("lightContainer");
    }
  }, [darkmode]);

  return (
    <div className={`${styles[changeDarkMode]}`}>
      {location !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/CoursePage" element={<CoursePage />} />
        <Route path="/Profile" element={<Perfil />} />
        <Route path="/Compras" element={<Compras />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/CourseDetails/:id" element={<CourseDetails />} />
      </Routes>
    </div>
  );
}

export default App;
