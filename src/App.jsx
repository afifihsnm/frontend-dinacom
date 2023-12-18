import { Routes, Route } from 'react-router-dom';

import NavbarComponents from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ComplaintPage from './pages/ComplaintPage';


function App() {
  return (
    <div>
      <NavbarComponents />
        <Routes>
          <Route path='/' Component={HomePage}></Route>
          <Route path='/tentang' Component={AboutPage}></Route>
          <Route path='/komplain' Component={ComplaintPage}></Route>
          <Route path='/login' Component={LoginPage}></Route>
        </Routes>
      <FooterComponent />
    </div>
    );
  }

export default App;