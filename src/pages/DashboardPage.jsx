import { Card, Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import Image 
import IconCircleTime from "../assets/icon/circle-time.svg";
import IconCircleBlank from "../assets/icon/circle-blank.svg";
import IconCircleCheck from "../assets/icon/circle-check.svg";
import IconCircleX from "../assets/icon/circle-x.svg";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [laporanUser, setLaporan] = useState([]);
  const [totalNotYetHandled, setTotalNotYetHandled] = useState(0);
  const [totalHandled, setTotalHandled] = useState(0);
  const [totalFinished, setTotalFinished] = useState(0);
  const [totalCanceled, setTotalCanceled] = useState(0);

  const [filteredLaporanUser, setFilteredLaporanUser] = useState([]);

  const handleStatusChange = async (reportId, statusType) => {
    const token = localStorage.getItem('token');

    try {
      console.log('Sending request to:', `https://admin.sadam.bid/api/v1/users/dashboard/report/${reportId}/${statusType}`);

      const response = await fetch(`https://admin.sadam.bid/api/v1/users/dashboard/report/${reportId}/${statusType}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response);

      if (!response.ok && response.status !== 204) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.status === 204) {
        // If status code is 204 (No Content), the request was successful, no need to parse JSON
        console.log('Report deleted successfully!');
      } else {
        // Parse JSON if status is not 204
        const data = await response.json();
        console.log(`Status Berhasil Diubah (${statusType}):`, data);
      }

      // Reload the page after successful status change
      window.location.reload();
    } catch (error) {
      console.error(`Error changing status (${statusType}):`, error);
    }
  };


  const handleFilterClick = async (filterType) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://admin.sadam.bid/api/v1/users/dashboard/filter/${filterType}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Filtered Data (${filterType}):`, data);

      // Setelah mendapatkan data yang difilter, Anda dapat memperbarui state
      setFilteredLaporanUser(data.data);
    } catch (error) {
      console.error(`Error fetching filtered data (${filterType}):`, error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    }

    fetch('https://admin.sadam.bid/api/v1/users/dashboard', {
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
        console.log('API Response:', data);

        // Set total counts
        setTotalNotYetHandled(data.totalStatusNotYetHandled);
        setTotalHandled(data.totalStatusHandled);
        setTotalFinished(data.totalStatusFinished);
        setTotalCanceled(data.totalStatusCanceled);

        // Set user reports
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
                {totalNotYetHandled} Laporan
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex mb-0"><img src={IconCircleBlank} />Sedang ditangani</Card.Title>
              <Card.Text>
                {totalHandled} Laporan
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex mb-0"><img src={IconCircleCheck} />Selesai</Card.Title>
              <Card.Text>
                {totalFinished} Laporan
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex mb-0"><img src={IconCircleX} />Ditolak</Card.Title>
              <Card.Text>
                {totalCanceled} Laporan
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
                <Dropdown.Item onClick={() => handleFilterClick('latest')}><i className="bi bi-sort-up" />Terbaru</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterClick('longest')}><i className="bi bi-sort-down" />Lama</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterClick('notyethandled')}><i className="bi bi-filter-circle" />Belum ditangani</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterClick('handled')}><i className="bi bi-filter-circle" />Sedang ditangani</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterClick('finish')}><i className="bi bi-filter-circle" />Selesai</Dropdown.Item>
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

          {laporanUser.length > 0 && <ReportUser laporanUser={laporanUser} filteredLaporanUser={filteredLaporanUser} handleStatusChange={handleStatusChange} />}
        </div>
      </div>
    </div>
  );
};

function ReportUser({ laporanUser, filteredLaporanUser, handleStatusChange }) {
  const laporanToRender = filteredLaporanUser.length > 0 ? filteredLaporanUser : laporanUser;

  return (
    <div className="laporan-user">
      {laporanToRender.map(data => (
        <div key={data.id} className="d-flex flex-column mb-3">
          <p className="mb-2">{data.publishedAt}</p>
          <div className="laporan-artikel d-flex w-100">
            {data.user && data.user.avatar && (
              <img src={data.user.avatar.replace('https://sadam.bid/', '')} alt={`Laporan ${data.id}`} className="avatar" />
            )}
            <div className="laporan-content w-100">
              <div className="laporan-head d-flex">
                <div className="badge d-flex gap-2 p-0 mb-2 align-items-center">
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
                      <Dropdown.Item onClick={() => handleStatusChange(data.id, 'notyethandled')}>
                        <i className="bi bi-arrow-return-right" />
                        <label className="notproses">Belum ditangani</label>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleStatusChange(data.id, 'handled')}><i className="bi bi-arrow-return-right" /><label className="proses">Sedang ditangani</label></Dropdown.Item>
                      <Dropdown.Item onClick={() => handleStatusChange(data.id, 'finish')}><i className="bi bi-arrow-return-right" /><label className="done">Selesai</label></Dropdown.Item>
                      <Dropdown.ItemText>Hapus Laporan</Dropdown.ItemText>
                      <Dropdown.Item onClick={() => handleStatusChange(data.id, 'delete')}><i className="bi bi-arrow-return-right" /><label className="del">Hapus laporan</label></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                </div>
              </div>
              <div className="laporan-body">
              <Link
                to={`/lapor-publik/${data.id}`}
                className="laporan-body-link text-decoration-none"
              >
                <h4>{data.title}</h4>
                <p>{data.content}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;