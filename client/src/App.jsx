import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

import styles from "./App.module.css";

import NavBar from './components/bars/NavBar/NavBar';
import LandingPage from './components/views/LandingPage/LandingPage';
import HomePage from './components/views/HomePage/HomePage';
import CoursePage from './components/views/CoursePage/CoursePage';
import CourseDetails from './components/datos/CoursesDetails/CoursesDetails';
import Perfil from './components/views/Perfil/Perfil';
import Compras from './components/views/Compras/Compras';
import Cart from './components/views/Cart/Cart';
import AdminPanel from './components/views/AdminPanel/AdminPanel';
import Commingsoon from './components/views/Commingsoon/Commingsoon';


//_________________________module_________________________
function App () {

    //global state:
    const darkMode = useSelector((state)=> state.darkMode);

    //const:
    const navigate = useNavigate();
    const location = useLocation().pathname;

    //functions:
    const getClassNames = (baseClassName, darkMode) => {
        const suffix = darkMode ? 'dark' : 'light';
        return `${baseClassName}-${suffix}`;
    };

    //component:
    return (
        <div className={`${styles.component} ${styles[getClassNames("component")]}`}>
            {
                location !== "/" && <NavBar/>
            }
            <Routes>
                <Route path="/" element = {<LandingPage/>} />
                <Route path="/HomePage" element = {<HomePage/>} />
                <Route path="/CoursePage" element = {<CoursePage/>} /> 
                <Route path="/CourseDetails/:id" element = {<CourseDetails/>} /> 
                <Route path="/Profile" element = {<Perfil/>} />
                <Route path="/Compras" element = {<Compras/>} />
                <Route path="/Cart" element = {<Cart/>} />
                <Route path="/Commingsoon" element = {<Commingsoon/>} />
                <Route path="/AdminPanel" element = {<AdminPanel/>} />
            </Routes>
        </div>
    )
}

export default App;