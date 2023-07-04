import { Routes, Route, } from 'react-router-dom';
import HomePage from './components/views/HomePage/HomePage';
import LandingPage from './components/views/LandingPage/LandingPage';
import Coursepage from './components/views/CoursePage/CoursePage';


function App () {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/CoursePage/:id" element={<Coursepage/>} /> 

      </Routes> 
    </div>
  )
}

export default App;
