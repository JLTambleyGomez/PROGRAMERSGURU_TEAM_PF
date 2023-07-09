import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

//__________________________________________________
const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
