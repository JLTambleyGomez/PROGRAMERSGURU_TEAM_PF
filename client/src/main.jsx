import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { BrowserRouter } from 'react-router-dom';
// import "./config/firebase";
import './index.css';
import App from './App';
import axios from "axios";
axios.defaults.baseURL = 'https://pfserverdeploy-production.up.railway.app'  
// axios.defaults.baseURL = 'http://localhost:3001/'  

//__________________________________________________
const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
