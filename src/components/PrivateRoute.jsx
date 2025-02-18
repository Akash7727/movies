
import { Navigate, Outlet } from 'react-router-dom'; // Import Navigate
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const user = useSelector((state) => state.auth.user);

  return user ? (
    <Outlet/> // Render the passed element if the user is authenticated
  ) : (
    <Navigate to="/login" /> // Redirect to login if not authenticated
  );
};

export default PrivateRoute;