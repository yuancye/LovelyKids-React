import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the useAuth hook
import '../css/header.css';

const Header = () => {
  const { username, logout } = useAuth();

  return (
    <header id="top-bar">
      <section id="logo-container">
        <img src="imgs/logo.png" alt="logo"/>
      </section>
      <section id="drop-down">
        {username ? (
          <>
            <p>{username}</p>
            <section id="dropdown-content">
              <Link to='/'>Scores</Link>
              <Link to='/kids'>Add Kids</Link>
              <Link to='/rules'>Generate Rules</Link>
            </section>
            <p onClick={logout} style={{ cursor: 'pointer' }}>Logout</p>
          </>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </section>
    </header>
  );
};

export default Header;
