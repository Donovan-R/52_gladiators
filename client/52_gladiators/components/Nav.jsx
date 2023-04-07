import React, { useState, useEffect, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contRef = useRef(null);
  const linksRef = useRef(null);
  const userName = localStorage.getItem('user');

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (isOpen) {
      contRef.current.style.height = linksHeight + 'px';
    } else {
      contRef.current.style.height = '0px';
    }
  }, [isOpen]);

  const disconnectClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
  };

  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <h5>{userName}</h5>
          <button className='nav-toggle' onClick={() => setIsOpen(!isOpen)}>
            <FaBars />
          </button>
        </div>
        <div className='links-container' ref={contRef}>
          <ul className='links' ref={linksRef}>
            {token ? (
              <>
                <li>
                  <Link to='/ludi'>Mes ludi</Link>
                </li>
                <li>
                  <Link to='/' onClick={disconnectClick}>
                    se déconnecter
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to='/'>se connecter</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
