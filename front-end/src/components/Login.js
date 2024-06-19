import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import the useAuth hook

const Login = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/login', { username })
      .then(res => {
        setMessage(res.data);
        login(username); // Call the login function from the context
        navigate('/');
      })
      .catch(err => {
        if (err.response) {
          alert(err.response.data);
          navigate('/registration');
        } else {
          setMessage('An error occurred. Please try again.');
        }
      });
  };

  return (
    <div className='body background'>
      <section className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <article className='form-group'>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </article>
          <button type="submit">Login</button>
        </form>
        {message && <p className='message'>{message}</p>}
        <section className='link'>
          <Link to="/registration">Register</Link>
        </section>
      </section>
    </div>
  );
};

export default Login;
