// LoginPage.js
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className='d-flex w-100 login'>
        <div className='login-form d-flex flex-column align-items-left'>
          <img src="../src/assets/img/logo-sadam.png" alt="hero-img" className='d-inline-block'  />
          <h1>Hai, Selamat datang. Senang bertemu denganmu 👋</h1>
          <LoginForm className='col-6' />
          </div>    
        <img src="../src/assets/img/login-hero.png" alt="hero-img" className='fluid col-6' />
      </div>
    </div>
  );
};

export default LoginPage;
