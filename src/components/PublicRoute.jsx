import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = () => {
    const isAuthorize = localStorage.getItem("user"); // Check if user is logged in
    return isAuthorize ? <Navigate to="/dashboard" /> : <Outlet />; // Redirect to dashboard if logged in, otherwise render child routes
}

export default PublicRoute;