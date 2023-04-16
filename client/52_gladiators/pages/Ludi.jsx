import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LudusCreator from '../components/LudusCreator';

const Ludi = () => {
  const [ludi, setLudi] = useState([]);
  const token = localStorage.getItem('token');
  const url = 'http://localhost:5000/api/v1/ludi/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/auth/ludi',
        ludus
      );
    } catch (error) {
      console.log(error);
    }
  };

  //* allLudi

  const getAllLudi = async () => {
    try {
      const { data } = await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setLudi(data.ludi);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllLudi();
  }, []);

  console.log(ludi.length);

  return (
    <>
      <h2>Maison des ludi</h2>
      <div>
        {ludi.length === 0 ? (
          <section className='createLudusSection'>
            <h2>Créer votre ludus</h2>{' '}
            <form action='' onSubmit={handleSubmit}>
              <LudusCreator />{' '}
            </form>
          </section>
        ) : (
          <p>ok</p>
        )}
      </div>
    </>
  );
};

export default Ludi;
