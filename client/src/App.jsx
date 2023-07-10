import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

import styles from "./App.module.css";
import NavBar from './components/bars/NavBar/NavBar';
import LandingPage from './components/views/LandingPage/LandingPage';
import HomePage from './components/views/HomePage/HomePage';
import CoursePage from './components/views/CoursePage/CoursePage';
import CourseDetails from './components/datos/CoursesDetails/CoursesDetails';
import Profile from './components/views/Profile/Profile';
import Shop from './components/views/Shop/Shop';
import Cart from './components/views/Cart/Cart';
import AdminPanel from './components/views/AdminPanel/AdminPanel';
import Commingsoon from './components/views/Commingsoon/Commingsoon';

//_________________________module_________________________
function App () {

    //global state:
    const dark = useSelector((state)=> state.darkMode);

    //const:
    const navigate = useNavigate();
    const location = useLocation().pathname;

    //functions:
    const getClassNames = (baseClassName) => {
        const suffix = dark ? 'dark' : 'light';
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
                <Route path="/Profile" element = {<Profile/>} />
                <Route path="/Shop" element = {<Shop/>} />
                <Route path="/Cart" element = {<Cart/>} />
                <Route path="/Commingsoon" element = {<Commingsoon/>} />
                <Route path="/AdminPanel" element = {<AdminPanel/>} />
            </Routes>
        </div>
    )
}

export default App;