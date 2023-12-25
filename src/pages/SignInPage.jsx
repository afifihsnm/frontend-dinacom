import SignInForm from '../components/SignInForm';

const SignInPage = () => {
  return (
    <div className="signinpage">
      <div className='d-flex w-100 sign-in-page'>
        <div className='sign-in d-flex flex-column align-items-left py-5 w-100'>
          <img src="../src/assets/img/logo-sadam.png" alt="hero-img" className='d-inline-block'  />
          <h1 className='px-1'>Hai, Selamat datang. Senang bertemu denganmu 👋</h1>
          <SignInForm className='col-6' />
          </div>    
        <img src="../src/assets/img/loginpage/signinhero.png" alt="hero-img" className='fluid col-6' />
      </div>
    </div>
  );
};

export default SignInPage;