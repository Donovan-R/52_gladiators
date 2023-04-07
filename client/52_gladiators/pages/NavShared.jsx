import Navbar from '../components/Nav';
import { Outlet } from 'react-router-dom';

const NavShared = ({ token, setToken }) => {
  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <Outlet />
    </>
  );
};

export default NavShared;
