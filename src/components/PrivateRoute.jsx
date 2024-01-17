import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');

  // Render komponen yang sesuai jika token valid
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;