import SignInForm from "../components/SignInForm";

const SignInPage = () => {
  return (
    <div className="SignInPage">
      <div className="d-flex w-100 sign-in-page">
        <div className="sign-in d-flex flex-column align-items-left py-5 w-100">
          <img
            src="../src/assets/img/logo-sadam.png"
            alt="hero-img"
            className="d-inline-block animate__animated animate__fadeInUp"
          />
          <h1 className="px-1 animate__animated animate__fadeInUp">
            Hai, Selamat datang. Senang bertemu denganmu 👋
          </h1>
          <SignInForm />
        </div>
        <img
          src="../src/assets/img/loginpage/signinhero.png"
          alt="hero-img"
          height="1277px"
          className="fluid col-6"
        />
      </div>
    </div>
  );
};

export default SignInPage;
