import { Card, Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";

const Dashboard = () => {

  const [laporan, setLaporan] = useState([]);

  // Ambil data laporan dari API menggunakan useEffect
  useEffect(() => {
    // Gantilah URL API dengan URL sesuai aplikasi Anda
    fetch('https://fakestoreapi.com/products') // Use a different endpoint that returns an array of products
      .then((res) => res.json())
      .then((data) => setLaporan(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <div className="dashboard-card d-flex">
          <Card>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex mb-0"><img src="../src/assets/icon/circle-time.svg" />Belum ditangani</Card.Title>
              <Card.Text>
                0 Laporan
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex mb-0"><img src="../src/assets/icon/circle-blank.svg" />Sedang ditangani</Card.Title>
              <Card.Text>
                0 Laporan
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex mb-0"><img src="../src/assets/icon/circle-check.svg" />Selesai</Card.Title>
              <Card.Text>
                0 Laporan
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex mb-0"><img src="../src/assets/icon/circle-x.svg" />Ditolak</Card.Title>
              <Card.Text>
                0 Laporan
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="dashboard-head d-flex">
          <h3 className="mb-0">Aktivitas Terakhir</h3>
          <div className="filter">
            <Dropdown className="no-caret">
              <Dropdown.Toggle><i className="bi bi-filter" /><p>Urutkan</p></Dropdown.Toggle>

              <Dropdown.Menu drop="down">
                <Dropdown.ItemText>Urutkan</Dropdown.ItemText>
                <Dropdown.Item href="#/action-1"><i className="bi bi-sort-up" />Terbaru</Dropdown.Item>
                <Dropdown.Item href="#/action-2"><i className="bi bi-sort-down" />Lama</Dropdown.Item>
                <Dropdown.Item href="#/action-3"><i className="bi bi-filter-circle" />Belum ditangani</Dropdown.Item>
                <Dropdown.Item href="#/action-3"><i className="bi bi-filter-circle" />Sedang ditangani</Dropdown.Item>
                <Dropdown.Item href="#/action-3"><i className="bi bi-filter-circle" />Selesai</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="content mt-3">
          {/* Render pesan "Anda belum melakukan aktivitas apapun" jika tidak ada laporan */}
          {laporan.length === 0 && (
            <div className="no-activity">
              <i className="bi bi-calendar2-x"></i>
              <p>Anda belum melakukan aktivitas apapun</p>
            </div>
          )}

          {/* Render komponen Report hanya jika ada laporan */}
          {laporan.length > 0 && <Report laporan={laporan} />}
        </div>
      </div>
    </div>
  );
};

function Report({ laporan }) {
  return (
    <div className="laporan">
      {laporan.map(item => (
        <div key={item.id} className="d-flex flex-column mb-3">
          <div className="laporan-artikel d-flex w-100">
            <img src="../src/assets/img/logo-sadam.png" alt={`Laporan ${item.id}`} />
            <div className="laporan-content w-100">
              <div className="laporan-head d-flex">
                <div className="badge d-flex gap-2 p-0">
                  <h3>Username</h3>
                  <label></label>
                  <p>20/12/2023</p>
                  <label></label>
                  <label></label>
                </div>
                <div className="status">
                <Dropdown className="no-caret">
                <Dropdown.Toggle><p>Edit</p><i className="bi bi-chevron-down" /></Dropdown.Toggle>
                <Dropdown.Menu drop="down">
                <Dropdown.ItemText>Ubah status</Dropdown.ItemText>
                <Dropdown.Item href="#/action-1"><i className="bi bi-arrow-return-right" /><label className="notproses">Belum ditangani</label></Dropdown.Item>
                <Dropdown.Item href="#/action-2"><i className="bi bi-arrow-return-right" /><label className="proses">Lama</label></Dropdown.Item>
                <Dropdown.Item href="#/action-3"><i className="bi bi-arrow-return-right" /><label className="done">Belum ditangani</label></Dropdown.Item>
                <Dropdown.ItemText>Hapus Laporan</Dropdown.ItemText>
                <Dropdown.Item href="#/action-3"><i className="bi bi-arrow-return-right" /><label className="del">Selesai</label></Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown>
          
                </div>
              </div>
              <div className="laporan-body ">
                <h4>Pencemaran nama baik melalui media sosial</h4>
                <p>Saya ingin melaporkan adanya kegiatan pencemaran nama baik. Saya dituduh sebagai maling oleh orang yang tidak saya kenal. Saya mengetahui berita ini dari media sosial instagram dengan akun @akunignya. Apa yang diperlihatkan/ diposting oleh akun tersebut sepenuhnya tidak benar adanya. Saya hanya mengembalikan ...                </p>
              </div>
            </div>
          </div>
        </div>
      ))};
    </div>
  );
};

export default Dashboard;