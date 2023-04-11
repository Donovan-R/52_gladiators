import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LudusCreator from '../components/LudusCreator';

const Ludi = () => {
  const [ludi, setLudi] = useState([]);
  const token = localStorage.getItem('token');
  const url = 'http://localhost:5000/api/v1/ludi/';

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
      <div>{ludi.length === 0 ? <LudusCreator /> : <p>ok</p>}</div>
    </>
  );
};

export default Ludi;
