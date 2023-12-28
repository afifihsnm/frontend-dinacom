import SignUpForm from "../components/SignUpForm";
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSignUpSuccess = () => {
    // Arahkan pengguna ke dashboard setelah pendaftaran berhasil
    navigate('/masuk');
  };
  
  return (
    <div className="SignUpPage">
      <div className="d-flex w-100 sign-up-page">
        <div className="sign-up d-flex flex-column align-items-left my-5">
          <img
            src="../src/assets/img/logo-sadam.png"
            alt="hero-img"
            className="d-inline-block animate__animated animate__fadeInUp"
          />
          <h1 className="animate__animated animate__fadeInUp">Laporkan keresahanmu dengan mudah & cepat 🏃‍♂️</h1>
          <SignUpForm onSignUpSuccess={handleSignUpSuccess}/>
        </div>
        <img
          src="../src/assets/img/loginpage/signuphero.png"
          alt="hero-img"
          className="fluid col-6"
        />
      </div>
    </div>
  );
};

export default SignUpPage;