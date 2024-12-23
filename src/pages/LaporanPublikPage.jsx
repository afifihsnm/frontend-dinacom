import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

const LaporanPublikPage = () => {
  let navigate = useNavigate();
  const [laporanAll, setLaporanAll] = useState([]);
  const [filter, setFilter] = useState(1);
  const [activeFilter, setActiveFilter] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

    let apiPost = "https://admin.sadam.fr.to/api/v1/reports";

    if (filter === 2) {
      apiPost = "https://admin.sadam.fr.to/api/v1/reports/liked";
    } else if (filter === 3) {
      apiPost = "https://admin.sadam.fr.to/api/v1/reports/latest";
    }

    fetch(apiPost, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.removeItem("token");
          navigate("/masuk");
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setLaporanAll(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [filter]);

  const handleFilterChange = (value) => {
    setFilter(value);
    setActiveFilter(value);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLaporanAll = laporanAll.filter((data) => {
    const searchText = searchTerm.toLowerCase();
    return (
      data.title.toLowerCase().includes(searchText) ||
      data.content.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="laporan-publik">
      <div className="laporan-publik-content">
        <h1 className="mb-2">Laporan Publik</h1>
        <p className="mb-5">
          Buatlah laporan yang mudah dimengerti & dipercaya dengan cara
          menggunakan bahasa yang mudah dipahami dan sertakan bukti foto untuk
          memperkuat laporan yang telah kamu buat.
        </p>

        {/* Search bar */}
        <div className="search-bar mt-1 mb-4">
          <input
            className="search"
            type="text"
            placeholder="Cari laporan"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <i className="bi bi-search" />
        </div>

        <div className="laporan-filter d-flex">
          <ToggleButtonGroup
            className="toggle-group"
            type="radio"
            name="options"
            defaultValue={filter}
          >
            <ToggleButton
              className={`toggle-btn ${activeFilter === 1 ? 'active' : ''}`}
              id="tbg-radio-1"
              value={1}
              onClick={() => handleFilterChange(1)}
            >
              Semua laporan
            </ToggleButton>

            <ToggleButton
              className={`toggle-btn ${activeFilter === 2 ? 'active' : ''}`}
              id="tbg-radio-2"
              value={2}
              onClick={() => handleFilterChange(2)}
            >
              Butuh tanggapan cepat
            </ToggleButton>
            <ToggleButton
              className={`toggle-btn ${activeFilter === 3 ? 'active' : ''}`}
              id="tbg-radio-3"
              value={3}
              onClick={() => handleFilterChange(3)}
            >
              Terbaru
            </ToggleButton>

          </ToggleButtonGroup>
        </div>

        <div className="content mt-5">
          {laporanAll.length === 0 && (
            <div className="no-activity">
              <i className="bi bi-calendar2-x"></i>
              <p>Tidak ada aktivitas apapun</p>
            </div>
          )}
          {filteredLaporanAll.length > 0 && (
            <ReportAll laporanAll={filteredLaporanAll} />
          )}{" "}
        </div>
      </div>
    </div>
  );
};

function ReportAll({ laporanAll }) {
  return (
    <div className="laporan-all">
      {laporanAll.map((data) => (
        <div key={data.id} className="d-flex flex-column">
          <div className="laporan-artikel d-flex w-100">
            {data.user && data.user.avatar ? (
              <img
                src={data.user.avatar}
                alt={`Laporan ${data.id}`}
                className="avatar"
              />
            ) : (
              <div className="avatar-anonim" />
            )}
            <div className="laporan-content w-100">
              <div className="laporan-head d-flex">
                <div className="badge d-flex gap-2 p-0 mb-2 align-items-center">
                  {data.user && data.user.username && (
                    <h3>{data.user.username}</h3>
                  )}
                  {!data.user && (
                    <span className="anonim-username">Anonim</span>
                  )}
                  <p>{data.publishedAt}</p>
                  {data.status === 0 && (
                    <label className="badge-status1 d-flex">
                      Belum ditangani
                    </label>
                  )}
                  {data.status === 1 && (
                    <label className="badge-status2 d-flex">
                      Sedang Ditangani
                    </label>
                  )}
                  {data.status === 2 && (
                    <label className="badge-status3 d-flex">Selesai</label>
                  )}
                  {data.status === 3 && (
                    <label className="badge-status4 d-flex">Ditolak</label>
                  )}

                  {data.visibility === 1 && (
                    <label className="badge-post1 d-flex">
                      Terbuka untuk publik
                    </label>
                  )}
                  {data.visibility === 0 && (
                    <label className="badge-post2 d-flex">Rahasia</label>
                  )}
                </div>
              </div>
              <Link
                to={`/lapor-publik/${data.id}`}
                className="laporan-body-link"
              >
                <div className="laporan-body mb-2">
                  <h4>{data.title}</h4>
                  <p>{data.content}</p>
                  {data.image && data.image.length > 0 && (
                    <div className="clickable-image gap-2 d-flex">
                      {data.image.map((image, index) => (
                        <img
                          key={index}
                          src={`https://admin.sadam.fr.to/${image.path}`}
                          alt={`Laporan ${data.id} - Image ${index + 1}`}
                          onClick={() => {
                            setSelectedImage(image.path);
                            setShowImageModal(true);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="laporan-comment d-flex">
                  <p> Komentar ({data.totalComment})</p>
                  <span className="black-dot">•</span>
                  <p> Butuh tanggapan cepat ({data.totalNeedResponse}) </p>
                </div>
              </Link>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default LaporanPublikPage;
