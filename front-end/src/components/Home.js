import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
import { useAuth } from './AuthContext';


const Home = () => {
  const { username } = useAuth();

  return (
    <div>
     { username ? (
      <section id="score-container hidden">
        <h1>Log Stars</h1>
        <article class="error hidden">
          <p>Please Add Kids and Rules first!</p>
          <Link a='/kids'>Add Kids</Link>
        </article>
        <article id="users">
        </article>
        <fieldset id="events-container">
          <legend>Click to choose Events</legend>
          <section id='category-name'>
          

          </section>
        </fieldset>
        <button id="update-stars">Update Stars</button>
      </section>
     ) : (
      <div className='body background'>
        <section className="container">
          <p>Pleasae log in first!</p>
          <Link to='/login'>Login</Link>
        </section>
      </div>
     )}
    </div>
  );
};

export default Home;
