import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './components/views/HomePage/HomePage';
import LandingPage from './components/views/LandingPage/LandingPage';
import CoursePage from './components/views/CoursePage/CoursePage';
import NavBar from './components/bars/navBar/navBar';
import Perfil from './components/views/Perfil/Perfil';
import Compras from './components/views/Compras/Compras';
import styles from "./App.module.css";
import CourseDetails from './components/datos/CoursesDetails/CoursesDetails';


function App () {

  const navigate = useNavigate();
  const location = useLocation().pathname;


  return (
    <div className={styles.app}>
      {
        location !== "/" && <NavBar/>
      }
      <Routes>
        <Route path="/" element = {<LandingPage/>} />
        <Route path="/HomePage" element = {<HomePage/>} />
        <Route path="/CoursePage" element = {<CoursePage/>} /> 
        <Route path="/Profile" element = {<Perfil/>} />
        <Route path="/Compras" element = {<Compras/>} />
        <Route path="/CourseDetails/:id" element = {<CourseDetails/>} /> 
      </Routes>
    </div>
  )
}

export default App;
