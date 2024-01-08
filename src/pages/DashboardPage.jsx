import { Card, Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";

// Import Image 
import IconCircleTime from "../assets/icon/circle-time.svg";
import IconCircleBlank from "../assets/icon/circle-blank.svg";
import IconCircleCheck from "../assets/icon/circle-check.svg";
import IconCircleX from "../assets/icon/circle-x.svg";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [laporanUser, setLaporan] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    }

    fetch('https://admin.sadam.fr.to/api/v1/reports', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
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
        console.log('API Response:', data); // Log the entire response
        setLaporan(data.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [navigate]);


  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <div className="dashboard-card d-flex">
          <Card>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex mb-0"><img src={IconCircleTime} />Belum ditangani</Card.Title>
              <Card.Text>
                0 Laporan
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex mb-0"><img src={IconCircleBlank} />Sedang ditangani</Card.Title>
              <Card.Text>
                0 Laporan
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex mb-0"><img src={IconCircleCheck} />Selesai</Card.Title>
              <Card.Text>
                0 Laporan
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex mb-0"><img src={IconCircleX} />Ditolak</Card.Title>
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
          {laporanUser.length === 0 && (
            <div className="no-activity">
              <i className="bi bi-calendar2-x"></i>
              <p>Anda belum melakukan aktivitas apapun</p>
            </div>
          )}

          {laporanUser.length > 0 && <ReportUser laporanUser={laporanUser} />}
        </div>
      </div>
    </div>
  );
};

function ReportUser({ laporanUser }) {
  return (
    <div className="laporan-user">
      {laporanUser.map(data => (
        <div key={data.id} className="d-flex flex-column mb-3">
          <div className="laporan-artikel d-flex w-100">
            {data.user && data.user.avatar && (
              <img src={data.user.avatar} alt={`Laporan ${data.id}`} />
            )}
            <div className="laporan-content w-100">
              <div className="laporan-head d-flex">
                <div className="badge d-flex gap-2 p-0 align-items-center">
                  {data.user && data.user.username && (
                    <h3>{data.user.username}</h3>
                  )}
                  <label className="badge-anda d-flex">Anda</label>
                  <p>{data.publishedAt}</p>
                  {data.status === 0 && (
                    <label className="badge-status1 d-flex">Belum ditangani</label>
                  )}
                  {data.status === 1 && (
                    <label className="badge-status2 d-flex">Sedang Ditangani</label>
                  )}
                  {data.status === 2 && (
                    <label className="badge-status3 d-flex">Selesai</label>
                  )}
                  {data.status === 3 && (
                    <label className="badge-status4 d-flex">Ditolak</label>
                  )}


                  {data.visibility === 0 && (
                    <label className="badge-post1 d-flex">Terbuka untuk publik</label>
                  )}
                  {data.visibility === 1 && (
                    <label className="badge-post2 d-flex">Rahasia</label>
                  )}

                </div>
                <div className="status">
                  <Dropdown className="no-caret">
                    <Dropdown.Toggle><p>Edit</p><i className="bi bi-chevron-down" /></Dropdown.Toggle>
                    <Dropdown.Menu drop="down">
                      <Dropdown.ItemText>Ubah status</Dropdown.ItemText>
                      <Dropdown.Item href="#/action-1"><i className="bi bi-arrow-return-right" /><label className="notproses">Belum ditangani</label></Dropdown.Item>
                      <Dropdown.Item href="#/action-2"><i className="bi bi-arrow-return-right" /><label className="proses">Sedang ditangani</label></Dropdown.Item>
                      <Dropdown.Item href="#/action-3"><i className="bi bi-arrow-return-right" /><label className="done">Belum ditangani</label></Dropdown.Item>
                      <Dropdown.ItemText>Hapus Laporan</Dropdown.ItemText>
                      <Dropdown.Item href="#/action-3"><i className="bi bi-arrow-return-right" /><label className="del">Hapus laporan</label></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="laporan-body">
                <h4>{data.title}</h4>
                <p>{data.content}</p>
              </div>
            </div>
          </div>
        </div>
      ))};
    </div>
  );
};

export default Dashboard;