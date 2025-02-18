// src/components/Profile.js

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { logout } from '../redux/authSlice'; 

const Profile = () => {
  const user = useSelector((state) => state.auth.user); // Get user information from Redux state
  const dispatch = useDispatch(); // useDispatch to dispatch actions
  const navigate = useNavigate(); // useNavigate for navigation

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from local storage
    dispatch(logout()); // Dispatch the logout action to clear user state
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.firstName} {user.lastName}</p> {/* Render first and last name */}
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;