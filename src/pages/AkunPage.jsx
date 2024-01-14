import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AkunPage() {
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetch("https://admin.sadam.bid/api/v1/users/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.removeItem('token');
          navigate('/masuk');
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setUserData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [navigate]);

  return (
    <div className="akun">
      <div className="akun-content">
        <h1>Akun</h1>
        <div className="akun-category">
          <div className="akun-category-publik">
            <h2 className="mb-1">Publik</h2>
            <p className="mb-2">Data yang dapat dilihat oleh publik.</p>
            <hr className="mt-0 mb-4" />
            {userData && (
              <>
              <p className="profile">Foto Profil</p>
              <img src={userData.avatar} alt={`avatar ${userData.id}`} className="avatar mb-2"/>            
                <Form.Group className="mb-3">
                  <Form.Label>Nama Lengkap</Form.Label>
                  <Form.Control value={userData.namaLengkap} disabled />{" "}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control value={userData.username} disabled />{" "}
                </Form.Group>
              </>
            )}
          </div>
          <div className="akun-category-pribadi">
            <h2>Pribadi</h2>
            <p>Informasi pribadi</p>
            <hr className="mt-0 mb-4" />
            {userData && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal lahir</Form.Label>
                  <Form.Control value={userData.tanggalLahir} disabled />{" "}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tempat tinggal</Form.Label>
                  <Form.Control value={userData.tempatTinggal} disabled />{" "}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control value={userData.email} disabled />{" "}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="********" disabled />
                </Form.Group>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AkunPage;
