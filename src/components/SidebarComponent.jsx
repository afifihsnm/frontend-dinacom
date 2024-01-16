import { useState } from "react";
import { Link } from "react-router-dom"
import Offcanvas from "react-bootstrap/Offcanvas";

// Import Image
import Logo_Sadam from "../assets/img/sadamnavbar.png";

function Sidebar({ activePage }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = () => {
    fetch('https://admin.sadam.bid/api/v1/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Sesuaikan dengan cara autentikasi API Anda
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          // Hapus token dari localStorage setelah logout berhasil
          localStorage.removeItem('token');
          window.location.href = '/'; // Redirect ke halaman login atau halaman lain sesuai kebutuhan
        } else {
          // Handle kesalahan logout jika diperlukan
          console.error('Gagal logout:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Gagal logout:', error);
      });
}

  return (
    <div className="sidebar" responsive="lg">
      <span className="icon-bars" onClick={handleShow}><i className="fas fa-bars"></i></span>
      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header className="mb-3">
          <span className="icon-bars" onClick={handleClose}><i className="fa-solid fa-arrow-left-long"></i></span>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <h5>Layanan</h5>
          <Link to="/dashboard" className={activePage === "dashboard" ? "active" : ""}>
            <span className="icon"><i className="bi bi-house" style={{ fontSize: '1.5rem' }}></i></span>Dashboard
          </Link>
          <Link to="/laporin" className={activePage === "laporin" ? "active" : ""}>
            <span className="icon"><i className="bi bi-file-earmark-plus" style={{ fontSize: '1.5rem' }}></i></span>Laporin
          </Link>
          <Link to="/lapor-publik" className={activePage === "lapor-publik" ? "active" : ""}>
            <span className="icon"><i className="bi bi-file-earmark-text" style={{ fontSize: '1.5rem' }}></i></span>Laporan Publik
          </Link>
          <h5>Dukungan</h5>
          <Link to="/akun" className={activePage === "akun" ? "active" : ""}>
            <span className="icon"><i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i></span>Akun
          </Link>
          <Link to="/" onClick={logout}><span className="icon"><i className="bi bi-door-open" style={{ fontSize: '1.5rem' }}></i></span>Logout</Link>

        </Offcanvas.Body>
      </Offcanvas>

      <img
        src={Logo_Sadam}
        alt="Logo_Sadam"
        className="d-inline-block align-top"
      />

      <h5>Layanan</h5>
      <Link to="/dashboard" className={activePage === "dashboard" ? "active" : ""}>
        <span className="icon"><i className="bi bi-house" style={{ fontSize: '1.5rem' }}></i></span>Dashboard
      </Link>
      <Link to="/laporin" className={activePage === "laporin" ? "active" : ""}>
        <span className="icon"><i className="bi bi-file-earmark-plus" style={{ fontSize: '1.5rem' }}></i></span>Laporin
      </Link>
      <Link to="/lapor-publik" className={activePage === "lapor-publik" ? "active" : ""}>
        <span className="icon"><i className="bi bi-file-earmark-text" style={{ fontSize: '1.5rem' }}></i></span>Laporan Publik
      </Link>
      <h5>Dukungan</h5>
      <Link to="/akun" className={activePage === "akun" ? "active" : ""}>
        <span className="icon"><i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i></span>Akun
      </Link>
      <Link to="/" onClick={logout}><span className="icon"><i className="bi bi-door-open" style={{ fontSize: '1.5rem' }}></i></span>Logout</Link>

    </div>
  );
}

export default Sidebar;
