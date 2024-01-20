import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

//import CSS Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//import CSS Animate
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

// Import CSS Pages
import "./dist/css/main.css";
import "./dist/css/pages/AboutPage.css";
import "./dist/css/pages/HomePage.css";
import "./dist/css/pages/SignInPage.css";
import "./dist/css/pages/SignUpPage.css";
import "./dist/css/pages/DashboardPage.css";
import "./dist/css/pages/LaporinPage.css";
import "./dist/css/pages/LaporanLengkap.css";
import "./dist/css/pages/LaporanPublikPage.css";
import "./dist/css/pages/AkunPage.css";

// Import CSS Compponents
import "./dist/css/components/NavbarComponent.css";
import "./dist/css/components/NavInfo.css";
import "./dist/css/components/RunningTextComponent.css";
import "./dist/css/components/FooterComponent.css";
import "./dist/css/components/FooterDashboard.css";
import "./dist/css/components/SidebarComponent.css";

// Import CSS Form Page
import "./dist/css/Form/SignInForm.css";
import "./dist/css/Form/SignUpForm.css";
import "./dist/css/Form/ComplaintForm.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
