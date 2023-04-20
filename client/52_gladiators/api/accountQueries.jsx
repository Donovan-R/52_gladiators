import axios from 'axios';
// const token = localStorage.getItem('token');

async function getLaniste(token) {
  return await axios.get('http://localhost:5000/api/v1/account', {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
export default getLaniste;
