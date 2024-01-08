import { useParams } from "react-router-dom";

const LaporanLengkap = () => {
  const { id } = useParams();

  return (
    <div className="laporan-publik">
      <div className="laporan-publik-content">
        <h2>Artikel Lengkap ID: {id}</h2>
        <div>PPPPPPPPPPPPPPPPp</div>
      </div>
    </div>
  );
};

export default LaporanLengkap;
