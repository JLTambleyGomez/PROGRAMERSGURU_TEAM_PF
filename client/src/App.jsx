import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './components/views/HomePage/HomePage';
import LandingPage from './components/views/LandingPage/LandingPage';
import Coursepage from './components/views/CoursePage/CoursePage';
import NavBar from './components/bars/navBar/navBar';


function App () {

  const navigate = useNavigate();
  const location = useLocation().pathname;


  return (
    <div>
      {
        location !== "/" && (<NavBar/>)
      }
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/CoursePage/:id" element={<Coursepage/>} /> 

      </Routes> 
    </div>
  )
}

export default App;
