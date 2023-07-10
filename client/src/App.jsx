import React, { useState, useEffect }from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import styles from "./App.module.css";
import HomePage from './components/views/HomePage/HomePage';
import LandingPage from './components/views/LandingPage/LandingPage';
import CoursePage from './components/views/CoursePage/CoursePage';
import NavBar from './components/bars/navBar/navBar';
import Perfil from './components/views/Perfil/Perfil';
import Compras from './components/views/Compras/Compras';
import Cart from './components/views/Cart/Cart';
import InfoBar from './components/bars/infoBar/infoBar';
import AdminPanel from './components/views/AdminPanel/AdminPanel';
import CourseDetails from './components/datos/CoursesDetails/CoursesDetails';
import Commingsoon from './components/views/Commingsoon/Commingsoon';



//_________________________module_________________________
function App () {

    //const:
    const [isAtBottom, setIsAtBottom] = useState(false);

    const navigate = useNavigate();
    const location = useLocation().pathname;
    const [changeDarkMode , setChangeDarkMode] = useState("");
    const darkmode = useSelector((state)=> state.darkMode);

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

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
      }, []);
    
    useEffect (() => {
        if (darkmode === true) {
            setChangeDarkMode("darkContainer");
        } else{
            setChangeDarkMode("lightContainer");
        }
    } , [darkmode])

    //component:
    return (
        <div className={`${styles[changeDarkMode]}`}>
            {
                location !== "/" && <NavBar/>
            }
            <Routes>
                <Route path="/" element = {<LandingPage/>} />
                <Route path="/HomePage" element = {<HomePage/>} />
                <Route path="/CoursePage" element = {<CoursePage/>} /> 
                <Route path="/Profile" element = {<Perfil/>} />
                <Route path="/Compras" element = {<Compras/>} />
                <Route path="/Cart" element = {<Cart/>} />
                <Route path="/AdminPanel" element = {<AdminPanel/>} />
                <Route path="/CourseDetails/:id" element = {<CourseDetails/>} /> 
                <Route path="/Commingsoon" element = {<Commingsoon/>} />

                Commingsoon
            </Routes>
            {isAtBottom && (
                <InfoBar/>
            )}

        </div>
    )
}

export default App;