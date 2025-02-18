import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Signup.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = async (e) => {
    e.preventDefault();
    const newUser  = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      // Fetch existing users to determine the highest id
      const usersResponse = await fetch('http://localhost:3000/users');
      if (!usersResponse.ok) {
        throw new Error('Failed to fetch users');
      }
      const users = await usersResponse.json();

      // Calculate the new id
      const newId = users.length > 0 ? Math.max(...users.map(user => parseInt(user.id))) + 1 : 1;

      // Create the new user object with the new id
      const userWithId = { ...newUser , id: newId };

      // Send a POST request to the API to create a new user
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userWithId),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      dispatch(login(data)); // Assuming the API returns the created user
      navigate('/login'); // Redirect to Login page after signup
    } catch (error) {
      console.error('Error creating user:', error);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;