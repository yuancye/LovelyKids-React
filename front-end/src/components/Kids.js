import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Kids = () => {

  const { username } = useAuth();

  return (
    <div>
      {username ? (
        <section id="user-creator" class="hidden">
        <h1>Create User</h1>
        <label htmlFor='username'>Nick Name: </label>
        <input name="username" id="username" type="text"></input>
        <fieldset id="icon-container">
        </fieldset>
        <button id="add-kid">Add kid</button>
        <Link to='/rules'>Rule Generator</Link>
      </section>) : (
        <Link to='/login'>Login</Link>
      )};
    </div>
  );
};

export default Kids;
