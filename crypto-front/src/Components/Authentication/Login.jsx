import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const res = await axios.post("http://localhost:8000/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("token", res.data.access_token);
      navigate("/");
    } catch (error) {
      setIsError("Login failed, try again!")
      // alert("Login failed");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.loginForm}>
      <h2>Login</h2>
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
      <button type={styles.submit}>Login</button>
      <p className={styles.signupLink}>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
      <p className={styles.signupLink}>{isError}</p>
  </form>
  );
}
