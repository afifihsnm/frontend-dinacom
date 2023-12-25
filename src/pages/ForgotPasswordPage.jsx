import ForgotPasswordForm from '../components/ForgotPassswordForm';
import { useState, useEffect } from 'react';

const ForgotPasswordPage = () => {
  const [emailSentMessage, setEmailSentMessage] = useState(null);
  const [resetForm, setResetForm] = useState(false);

  const handleEmailSent = (email) => {
    setEmailSentMessage(`Link ganti kata sandi telah kami kirimkan ke ${email}`);
  };

  const handleFormReset = () => {
    setResetForm(true);
  };

  useEffect(() => {
    if (resetForm) {
      setEmailSentMessage(null);
      setResetForm(false);
    }
  }, [resetForm]);

  return (
    <div className="ForgotPasswordPage">
      <div className='d-flex w-100 fpasspage'>
        <div className='fpass d-flex flex-column align-items-left py-5 w-100'>
          <img src="../src/assets/img/logo-sadam.png" alt="hero-img" className='d-inline-block'  />
          <h1 className=''>{emailSentMessage || 'Ganti Kata Sandi 🔐'}</h1>
          
          {emailSentMessage ? (
            <p>
              Belum menerima email balasan?
              <span className="resend-link" onClick={handleFormReset}> Kirim Ulang</span>
            </p>
          ) : (
            <ForgotPasswordForm onEmailSent={handleEmailSent} onFormReset={handleFormReset} />
            )}
        </div>    
        <img
          src={`../src/assets/img/loginpage/${emailSentMessage ? 'fpassnew' : 'fpasshero'}.png`}
          alt="hero-img"
          className='fluid col-6'
        />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;