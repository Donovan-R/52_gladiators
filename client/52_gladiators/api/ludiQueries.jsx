import axios from 'axios';
const token = localStorage.getItem('token');
const url = 'http://localhost:5000/api/v1/ludi/';

async function getLudi() {
  return await axios.get(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
export default getLudi;
