import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user !== null ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoutes;
