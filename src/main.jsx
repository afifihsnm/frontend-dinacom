import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

/* Import CSS Pages */
import "./dist/css/main.css";
import "./dist/css/AboutPage.css";
import "./dist/css/HomePage.css";

/* Import CSS Compponents */
import "./dist/css/NavbarComponent.css";
import "./dist/css/RunningTextComponent.css";
import "./dist/css/FooterComponent.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
  </React.StrictMode>,
)