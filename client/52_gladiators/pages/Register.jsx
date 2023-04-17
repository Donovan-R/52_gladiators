import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [laniste, setLaniste] = useState({
    lastname: '',
    firstname: '',
    mail: '',
    password: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLaniste({ ...laniste, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        laniste
      );
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className='registerForm'>
        <div className='register'>
          <h2>52 - jeux du cirque</h2>
          <div className='underline'></div>

          <h3>Veuillez renseigner les champs ci-dessous</h3>

          <form onSubmit={handleSubmit} className='formContainer'>
            <div className='formRow'>
              <label htmlFor='lastname'>Nom</label>
              <input
                type='text'
                className='formInput'
                name='lastname'
                value={laniste.lastname}
                onChange={handleChange}
              />
            </div>
            <div className='formRow'>
              <label htmlFor='firstname'>Prénom</label>
              <input
                type='text'
                className='formInput'
                name='firstname'
                value={laniste.firstname}
                onChange={handleChange}
              />
            </div>
            <div className='formRow'>
              <label htmlFor='mail'>Email</label>
              <input
                type='email'
                className='formInput'
                name='mail'
                value={laniste.mail}
                onChange={handleChange}
              />
            </div>
            <div className='formRow'>
              <label htmlFor='password'>Mot de passe</label>
              <input
                type='password'
                name='password'
                value={laniste.password}
                onChange={handleChange}
              />
            </div>
            <div className='connectBtn'>
              <button>S'inscrire</button>
            </div>
          </form>
        </div>
        <span className='switchForm'>
          {' '}
          déjà inscrit ? <Link to='/'> page de connexion</Link>
        </span>
      </section>
    </>
  );
};

export default Register;
