import { Routes, Route } from 'react-router-dom';

import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ComplaintForm from './components/ComplaintForm';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function App() {
  return (
    <div>
      <NavbarComponent />
        <Routes>
        <Route path='/beranda' element={<HomePage />} />
        <Route path='/tentangkami' element={<AboutPage />} />
        <Route path='/complaint' element={<ComplaintForm />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/lupa-sandi' element={<ForgotPasswordPage />} />
        </Routes>
      <FooterComponent />
    </div>
    );
  }

export default App;