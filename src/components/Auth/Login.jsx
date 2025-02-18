import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      // Check if the email and password match any user
      const existingUser  = users.find(
        (user) => user.email === email && user.password === password
      );

      if (existingUser ) {
        dispatch(login(existingUser )); 
        navigate("/dashboard"); // Redirect to dashboard after login agr user exiit hai usmien
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("An error occurred while trying to log in. Please try again.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <form onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
      <button onClick={handleSignup}>Signup</button>
    </form>
  );
};

export default Login;