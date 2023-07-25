import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { BrowserRouter } from 'react-router-dom';
// import "./config/firebase";
import './index.css';
import App from './App';
import axios from "axios";
import URL from '../URL.JS';

axios.defaults.baseURL = URL

//__________________________________________________
const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);


