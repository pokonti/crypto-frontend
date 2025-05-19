import React from 'react'
import "./Menu.css";
import { useNavigate } from "react-router-dom";

function Menu({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="logo">CryptoWatcher</div>
      <input
        type="text"
        placeholder="Search crypto..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <nav>
        <a href="/portfolio">Portfolio</a>
        {isLoggedIn ? (
          <a href='/' onClick={handleLogout}>Logout</a>
          ) : (
            <a href="/login">Login</a>
        )}
      </nav>
    </header>
  )
}

export default Menu