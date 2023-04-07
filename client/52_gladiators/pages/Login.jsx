import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEye } from 'react-icons/ai';
import { GoEyeClosed } from 'react-icons/go';

const Login = ({ setToken }) => {
  const [passwordType, setPasswordType] = useState('password');

  const changePasswordType = (e) => {
    e.preventDefault();
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType('password');
    }
    return;
  };

  const [laniste, setLaniste] = useState({
    mail: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLaniste({ ...laniste, [name]: value });
  };

  const connectClick = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        laniste
      );

      localStorage.setItem('token', data.token);
      localStorage.setItem('laniste', laniste.mail);
      setToken(data.token);
      navigate('/ludi');
    } catch (error) {
      console.log(error);
      localStorage.removeItem('token');
    }
  };

  return (
    <>
      <section className='loginForm'>
        <div className='login'>
          <h2>52 - jeux du cirque</h2>
          <div className='underline'></div>
          <h3>veuillez vous identifier</h3>

          <form action='' className='formContainer'>
            <div className='formRow'>
              <label htmlFor='mail'>email</label>
              <input
                type='email'
                name='mail'
                value={laniste.mail}
                onChange={handleChange}
              />
            </div>
            <div className='formRow'>
              <label htmlFor='password'>mot de passe</label>
              <input
                type={passwordType}
                name='password'
                id=''
                value={laniste.password}
                onChange={handleChange}
              />
              <span
                className='showPassword'
                onClick={(e) => changePasswordType(e)}
              >
                {passwordType === 'password' ? (
                  <AiOutlineEye />
                ) : (
                  <GoEyeClosed />
                )}
              </span>
            </div>
            <div className='connectBtn'>
              <button onClick={connectClick}>Se connecter</button>
            </div>
          </form>
          <span className='switchForm'>
            pas de compte ?<Link to='/register'> c'est par ici</Link>
          </span>
        </div>
      </section>
    </>
  );
};

export default Login;
