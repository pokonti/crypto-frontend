import React from 'react'
import "./Menu.css";

function Menu({ searchTerm, setSearchTerm }) {
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
      </nav>
    </header>
  )
}

export default Menu