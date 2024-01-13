import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import NavbarComponent from "./components/NavbarComponent";
import Sidebar from "./components/SidebarComponent";
import FooterComponent from "./components/FooterComponent";
import PrivateRoute from "./components/PrivateRoute";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ComplaintForm from "./components/ComplaintForm";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NavInfo from "./components/NavInfo";
import NewPassPage from "./pages/NewPassPage";
import DashboardPage from "./pages/DashboardPage";
import LaporinPage from "./pages/LaporinPage";
import LaporanPublikPage from "./pages/LaporanPublikPage";
import AkunPage from "./pages/AkunPage";
import LaporanLengkap from "./pages/LaporanLengkap";
import FooterDashboard from "./components/FooterDashboard";

function App() {
  const location = useLocation();
  const [activePage, setActivePage] = useState("");
  const [isLaporanLengkap, setIsLaporanLengkap] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const path = location.pathname.substring(1);
    setActivePage(path);
    setIsLaporanLengkap(location.pathname.startsWith("/lapor-publik/"));
  }, [location.pathname]);

  const isLoginPage = ["/masuk", "/daftar", "/lupa-sandi"].includes(
    location.pathname
  );
  const showSidebar =
    isLaporanLengkap ||
    ["/dashboard", "/laporin", "/lapor-publik", "/akun"].includes(
      location.pathname
    );

  if (token) {
    return (
      <div>
        {showSidebar && <Sidebar activePage={activePage} />}
        <Routes>
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="/laporin" element={<PrivateRoute />}>
            <Route path="/laporin" element={<LaporinPage />} />
          </Route>
          <Route path="/lapor-publik" element={<PrivateRoute />}>
            <Route path="/lapor-publik" element={<LaporanPublikPage />} />
            <Route path="/lapor-publik/:id" element={<LaporanLengkap />} />
          </Route>
          <Route path="/akun" element={<PrivateRoute />}>
            <Route path="/akun" element={<AkunPage />} />
          </Route>
        </Routes>
          {showSidebar && <FooterDashboard />}
      </div>
    );
  } else {
    return (
      <div>
        {isLoginPage && <NavInfo />}
        {!showSidebar && <NavbarComponent />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tentangkami" element={<AboutPage />} />
          <Route path="/pengaduan" element={<ComplaintForm />} />
          <Route path="/masuk" element={<SignInPage />} />
          <Route path="/daftar" element={<SignUpPage />} />
          <Route path="/lupa-sandi" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="/laporin" element={<PrivateRoute />}>
            <Route path="/laporin" element={<LaporinPage />} />
          </Route>
          <Route path="/lapor-publik" element={<PrivateRoute />}>
            <Route path="/lapor-publik" element={<LaporanPublikPage />} />
            <Route path="/lapor-publik/:id" element={<LaporanLengkap />} />
          </Route>
          <Route element={<AkunPage />} />
        </Routes>
        {!showSidebar && <FooterComponent />}
      </div>
    );
  }
}

export default App;
