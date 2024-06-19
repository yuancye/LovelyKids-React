import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/register', { username })
      .then(res => {
        setMessage(res.data);
      })
      .catch(err => {
        if (err.response) {
          setMessage(err.response.data);
        } else {
          setMessage('An error occurred. Please try again.');
        }
      });
  };

  return (
    <div className='body light-background'>
      <section className="container">
        <h1>Registration</h1>
        <form onSubmit={handleSubmit}>
          <article className='form-group'>
            <label htmlFor="username">Username:</label>
            <input
              id='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </article>
          <button type='submit'>Create an Account</button>
        </form>
        {message && <p className='message'>{message}</p>}
        <section className='link'>
          <Link to="/login">Login</Link>
        </section>
      </section>
    </div>
  );
};

export default Registration;
