import React from 'react';

function Navbar({ username, onLogout, completedCount, totalCount }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1>DSA Sheet Tracker</h1>
        <div className="nav-info">
          <span className="progress-info">
            Progress: {completedCount}/{totalCount}
          </span>
          <span className="username">Welcome, {username}</span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;