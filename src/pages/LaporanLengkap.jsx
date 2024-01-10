import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const LaporanLengkap = () => {
  const { id } = useParams();
  const [laporanDetail, setLaporanDetail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    }

    // Sesuaikan URL API sesuai kebutuhan
    fetch(`https://admin.sadam.fr.to/api/v1/reports/${id}`, {
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
        setLaporanDetail(data); // Set data laporanDetail sesuai API response
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  return (
    <div className="laporan-publik">
      <div className="laporan-publik-content">
        {laporanDetail ? (
          <div>
            <h2>{laporanDetail.title}</h2>
            <p>{laporanDetail.content}</p>
            {/* Tambahan informasi sesuai kebutuhan dari API response */}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default LaporanLengkap;
  