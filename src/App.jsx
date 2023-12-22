import { Routes, Route } from 'react-router-dom';

import NavbarComponents from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ComplaintForm from './components/ComplaintForm';

function App() {
  return (
    <div>
      <NavbarComponents />
        <Routes>
          <Route path='/beranda' Component={HomePage}></Route>
          <Route path='/tentangkami' Component={AboutPage}></Route>
          <Route path='/complaint' Component={ComplaintForm}></Route>
          <Route path='/login' Component={LoginPage}></Route>
        </Routes>
      <FooterComponent />
    </div>
    );
  }

export default App;