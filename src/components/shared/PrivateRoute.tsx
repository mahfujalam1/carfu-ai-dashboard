import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Simple auth check - in a real app this would use a proper auth state/context
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
