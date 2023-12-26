import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="SignUpPage">
      <div className="d-flex w-100 sign-up-page">
        <div className="sign-up d-flex flex-column align-items-left my-5">
          <img
            src="../src/assets/img/logo-sadam.png"
            alt="hero-img"
            className="d-inline-block"
          />
          <h1 className="">Laporkan keresahanmu dengan mudah & cepat 🏃‍♂️</h1>
          <SignUpForm className="col-6" />
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