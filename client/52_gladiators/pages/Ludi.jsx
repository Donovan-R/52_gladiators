import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Ludi = () => {
  const [ludi, setLudi] = useState([]);
  const token = localStorage.getItem('token');
  const url = 'http://localhost:5000/api/v1/ludi/';
  const inputRef = useRef(null);

  //* focus

  useEffect(() => {
    inputRef.current.focus();
  }, [isEditing, taskAdded]);

  //* allTasks

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

  return <h2>page des ludi</h2>;
};

export default Ludi;
