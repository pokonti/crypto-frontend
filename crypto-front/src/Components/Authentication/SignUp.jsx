import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./SignUp.module.css";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        await axios.post("http://localhost:8000/auth/register", {
        username,
        password
      });
      console.log("Registered successfully! Please login.");
      setUsername("");
      setPassword("");
      navigate("/login");
    } catch (err) {
        console.log("Registration failed.");
        console.error(err);
    }
  };

  return (
    <form onSubmit={handleRegister} className={styles.signupForm}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Create Account</button>
      <p className={styles.signupLink}>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </form>
  );
}
