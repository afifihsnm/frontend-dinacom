import { Routes, Route, Link, useLocation } from "react-router-dom";

import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ComplaintForm from "./components/ComplaintForm";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NavInfo from "./components/NavInfo";
import NewPassPage from "./pages/NewPassPage";
import Dashboard from "./pages/DashboardPage";
import Sidebar from "./components/SidebarComponent";

function App() {
  const location = useLocation();
  const isLoginPage = ["/masuk", "/daftar", "/lupa-sandi"].includes( location.pathname );
  const isDashboardPage = location.pathname === "/dashboard";

  return (
    <div>
      {isLoginPage && <NavInfo />}
      {!isDashboardPage && <NavbarComponent />}
      {isDashboardPage && <Sidebar />}
      <Routes>
        <Route path="/beranda" element={<HomePage />} />
        <Route path="/tentangkami" element={<AboutPage />} />
        <Route path="/complaint" element={<ComplaintForm />} />
        <Route path="/masuk" element={<SignInPage />} />
        <Route path="/daftar" element={<SignUpPage />} />
        <Route path="/lupa-sandi" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {!isDashboardPage && <FooterComponent />}
    </div>
  );
}

export default App;
