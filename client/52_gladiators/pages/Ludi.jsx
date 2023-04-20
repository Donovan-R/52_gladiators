import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getLudi from '../api/ludiQueries';
import getLaniste from '../api/accountQueries';
// import LudusCreator from '../components/LudusCreator';
const specialities = ['lutte', 'course de char', 'athlétisme'];

const Ludi = () => {
  const [ludi, setLudi] = useState([]);
  const token = localStorage.getItem('token');
  const [ludus, setLudus] = useState({
    name: '',
    speciality_name: '',
  });
  const url = 'http://localhost:5000/api/v1/ludi/';
  const [denier, setDenier] = useState('');

  const getLanisteInfos = async () => {
    try {
      const { data: laniste } = await getLaniste(token);
      setDenier(laniste.laniste[0].denier);
      console.log(laniste.laniste[0].firstname);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLanisteInfos();
  }, [setDenier, token]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
    setLudus({ ...ludus, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        url,
        { name: ludus.name, speciality_name: ludus.speciality_name },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setLudi([...ludi, ludus]);
      setLudus({ name: '', speciality_name: '' });
    } catch (error) {
      console.log(error);
    }
  };

  //* allLudi

  const getAllLudi = async () => {
    try {
      const { data } = await getLudi();
      console.log(data);
      setLudi(data.ludi);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllLudi();
  }, []);

  return (
    <>
      <h2>Maison des ludi</h2>
      <div>
        {ludi.length === 0 ? (
          <section className='createLudusSection'>
            <h2>Créer votre ludus</h2>{' '}
            <form action='' onSubmit={handleSubmit}>
              <>
                <div className='formRow'>
                  <label htmlFor='name'>
                    choisissez un nom pour votre ludus
                  </label>
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
                  <select
                    className='formInput'
                    onChange={handleChange}
                    name='speciality_name'
                  >
                    <option value=''>--choisissez une spécialité--</option>
                    {specialities.map((speciality, index) => {
                      return (
                        <option value={speciality} key={index}>
                          {speciality}
                        </option>
                      );
                    })}
                    {/* <option value={'course de char'}>course de char</option>
                    <option value={'lutte'}>lutte</option>
                    <option value={'athlétisme'}>athlétisme</option> */}
                  </select>
                </div>
              </>
            </form>
          </section>
        ) : (
          <section className='myLudi'>
            <p>bienvenue , vous avez {ludi.length} ludi: </p>
            <span>vous avez {denier} deniers</span>
            <div>
              {ludi.map((ludus) => {
                const { ludus_id, name, speciality_name, gladiators_number } =
                  ludus;
                return (
                  <article key={ludus_id}>
                    <h3>nom du ludus : {name}</h3>,{' '}
                    <h4>spécialité du ludus : {speciality_name}</h4>,{' '}
                    <h4>nombre de combattants :{gladiators_number}</h4>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Ludi;
