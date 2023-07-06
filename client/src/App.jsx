import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './components/views/HomePage/HomePage';
import LandingPage from './components/views/LandingPage/LandingPage';
import CoursePage from './components/views/CoursePage/CoursePage';
import NavBar from './components/bars/navBar/navBar';
import Perfil from './components/views/Perfil/Perfil';
import Compras from './components/views/Compras/Compras';
import styles from "./App.module.css";
import AdminPanel from './components/views/AdminPanel/AdminPanel';
import CourseDetails from './components/datos/CoursesDetails/CoursesDetails';
import React,{useState,useEffect}from "react";
import { useSelector} from "react-redux";



function App () {

  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [changeDarkMode , setChangeDarkMode] = useState("");
  const darkmode = useSelector((state)=> state.darkMode);

  useEffect (() => {
    if (darkmode === true){
      setChangeDarkMode("darkContainer");
    }else{
      setChangeDarkMode("lightContainer");
    }
    } , [darkmode])
  

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
        <Route path="/AdminPanel" element = {<AdminPanel/>} />
        <Route path="/CourseDetails/:id" element = {<CourseDetails/>} /> 
      </Routes>
    </div>
  )
}

export default App;
