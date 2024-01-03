import SignInForm from "../components/SignInForm";
import { useNavigate  } from 'react-router-dom';

//Import Image
import Logo_Sadam from "../assets/img/logo-sadam.png";
import Hero from "../assets/img/loginpage/signinhero.png";

const SignInPage = () => {
  let navigate = useNavigate ();

  const handleLoginSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <div className="SignInPage">
      <div className="d-flex w-100 sign-in-page">
        <div className="sign-in d-flex flex-column align-items-left py-5 w-100">
          <img
            src={Logo_Sadam}
            alt="Logo_Sadam"
            className="d-inline-block animate__animated animate__fadeInUp"
          />
          <h1 className="px-1 animate__animated animate__fadeInUp">
            Hai, Selamat datang. Senang bertemu denganmu 👋
          </h1>
          <SignInForm onLoginSuccess={handleLoginSuccess}/>
        </div>
        <img
          src={Hero}
          alt="hero-img"
          height="1277px"
          className="fluid col-6"
        />
      </div>
    </div>
  );
};

export default SignInPage;
