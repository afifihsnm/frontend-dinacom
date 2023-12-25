import NewPassForm from '../components/NewPassForm'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const NewPassPage = () => {
  let navigate = useNavigate();
  
  const [emailSentMessage, setEmailSentMessage] = useState(null);
  const [resetForm, setResetForm] = useState(false);

  const handleEmailSent = (email) => {
    setEmailSentMessage('Kata sandi berhasil diganti. Silahkan masuk dengan kata sandi baru.');
  };

  const handleFormReset = () => {
    setResetForm(true);
  };

  useEffect(() => {
    if (resetForm) {
      // Setelah resetForm, bersihkan pesan emailSentMessage
      setEmailSentMessage(null);
      setResetForm(false);
    }
  }, [resetForm]);

  return (
    <div className="NewPassPage">
      <div className='d-flex w-100 newpasspage'>
        <div className='newpass d-flex flex-column align-items-left py-5 w-100'>
          <img src="../src/assets/img/logo-sadam.png" alt="hero-img" className='d-inline-block'  />
          <h1>{emailSentMessage || 'Ganti Kata Sandi Baru🔐'}</h1>
          {emailSentMessage ? (
          <button type="button" onClick={() => navigate("/masuk")} className="btn btn-outline-primary rounded-5">
            Masuk
          </button>
          ) : (
            <NewPassForm onEmailSent={handleEmailSent} onFormReset={handleFormReset} />
            )}
        </div>    
        <img
          src={`../src/assets/img/loginpage/${emailSentMessage ? 'signinhero' : 'fpasshero'}.png`}
          alt="hero-img"
          className='fluid col-6'
        />
      </div>
    </div>
  );
};

export default NewPassPage;