import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import NavbarComponent from "./components/NavbarComponent";
import Sidebar from "./components/SidebarComponent";
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
import LaporinPage from "./pages/LaporinPage";
import LaporanPublikPage from "./pages/LaporanPublikPage";
import PesanPage from "./pages/PesanPage";
import AkunPage from "./pages/AkunPage";

function App() {
  const location = useLocation();
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    const path = location.pathname.substring(1);
    setActivePage(path);
  }, [location.pathname]);

  const isLoginPage = ["/masuk", "/daftar", "/lupa-sandi"].includes(location.pathname);
  const isDashboardPage = location.pathname === "/dashboard";
  const isSidebarPage = ["/dashboard", "/laporin", "/lapor-publik", "/pesan", "/akun"].includes(location.pathname);

  return (
    <div>
      {isLoginPage && <NavInfo />}
      {isSidebarPage && <Sidebar activePage={activePage} />}
      {!isDashboardPage && !isSidebarPage && <NavbarComponent />}
      <Routes>
        <Route path="/beranda" element={<HomePage />} />
        <Route path="/tentangkami" element={<AboutPage />} />
        <Route path="/complaint" element={<ComplaintForm />} />
        <Route path="/masuk" element={<SignInPage />} />
        <Route path="/daftar" element={<SignUpPage />} />
        <Route path="/lupa-sandi" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/laporin" element={<LaporinPage />} />
        <Route path="/lapor-publik" element={<LaporanPublikPage />} />
        <Route path="/pesan" element={<PesanPage />} />
        <Route path="/akun" element={<AkunPage />} />
      </Routes>
      {!isDashboardPage && !isSidebarPage && <FooterComponent />}
    </div>
  );
}

export default App;
