import { Routes, Route, } from 'react-router-dom';
import HomePage from './components/views/HomePage/HomePage';
import LandingPage from './components/views/LandingPage/LandingPage';


function App() {

  return (
    <div >
      <Routes>
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/LandingPage" element={<LandingPage />} />

      </Routes> 
    </div>
  );
}

export default App;
