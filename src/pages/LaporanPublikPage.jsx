import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';


const LaporanPublikPage = () => {
  const [laporanAll, setLaporanAll] = useState([]);
  const [filter, setFilter] = useState(1); 

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    }

    let apiUrl = 'https://admin.sadam.fr.to/api/v1/reports'; 

    if (filter === 2) {
      apiUrl = 'https://admin.sadam.fr.to/api/v1/reports/latest';
    } else if (filter === 3) {
      apiUrl = 'https://admin.sadam.fr.to/api/v1/reports/liked';
    }

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('API Response:', data);
        setLaporanAll(data.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [filter]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <div className="laporan-publik">
      <div className="laporan-publik-content">
        <h1 className='mb-3'>Laporan Publik</h1>
        <p>
          Buatlah laporan yang mudah dimengerti & dipercaya dengan cara
          menggunakan bahasa yang mudah dipahami dan sertakan bukti foto untuk
          memperkuat laporan yang telah kamu buat.
        </p>

        <div className="laporan-filter d-flex">
          <ToggleButtonGroup className="toggle-group" type="radio" name="options" defaultValue={filter}>
            <ToggleButton className='toggle-btn' id="tbg-radio-1" value={1} onClick={() => handleFilterChange(1)}>
              Butuh tanggapan cepat
            </ToggleButton>
            <ToggleButton className='toggle-btn' id="tbg-radio-2" value={2} onClick={() => handleFilterChange(2)}>
              Semua laporan
            </ToggleButton>
            <ToggleButton className='toggle-btn' id="tbg-radio-3" value={3} onClick={() => handleFilterChange(3)}>
              Terbaru
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div className="content mt-5">
          {laporanAll.length === 0 && (
            <div className="no-activity">
              <i className="bi bi-calendar2-x"></i>
              <p>Anda belum melakukan aktivitas apapun</p>
            </div>
          )}

          {laporanAll.length > 0 && <ReportAll laporanAll={laporanAll} />}
        </div>

      </div>
    </div>
  );
};

function ReportAll({ laporanAll }) {
  return (
    <div className="laporan-all">
      {laporanAll.map((data) => (
        <div key={data.id} className="d-flex flex-column mb-3">
          <div className="laporan-artikel d-flex w-100">
            {data.user && data.user.avatar ? (
              <img src='https://{data.user.avatar}' alt={`Laporan ${data.id}`} />
            ) : (
              <div className="avatar-anonim"> 
              </div>
            )}
            <div className="laporan-content w-100">
              <div className="laporan-head d-flex">
                <div className="badge d-flex gap-2 p-0 align-items-center">
                  {data.user && data.user.username && (
                    <h3>{data.user.username}</h3>
                  )}
                  {!data.user && (
                    <span className="anonim-username">Anonim</span>
                  )}
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


                  {data.visibility === 1 && (
                    <label className="badge-post1 d-flex">Terbuka untuk publik</label>
                  )}
                  {data.visibility === 0 && (
                    <label className="badge-post2 d-flex">Rahasia</label>
                  )}
                </div>
              </div>
              <Link to={`/lapor-publik/${data.id}`} className='laporan-body-link'>
              <div className="laporan-body">
                <h4>{data.title}</h4>
                <p>{data.content}</p>
              </div>
            </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LaporanPublikPage; 