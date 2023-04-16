import React, { useState } from 'react';

const LudusCreator = () => {
  const [ludus, setLudus] = useState({
    name: '',
    speciality_id: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLudus({ ...ludus, [name]: value });
  };

  return (
    <>
      <div className='formRow'>
        <label htmlFor='name'>choisissez un nom pour votre ludus</label>
        <input
          type='text'
          className='formInput'
          name='name'
          value={ludus.name}
          onChange={handleChange}
        />
      </div>
      <div className='formRow'>
        <label htmlFor='speciality'>choix d'une spécialité</label>
        <select className='formInput' name='speciality'>
          <option value=''>--choisissez une spécialité--</option>
          <option value={ludus.speciality_id}>course de char</option>
          <option value={ludus.speciality_id}>lutte</option>
          <option value={ludus.speciality_id}>athlétisme</option>
        </select>
      </div>
    </>
  );
};

export default LudusCreator;
