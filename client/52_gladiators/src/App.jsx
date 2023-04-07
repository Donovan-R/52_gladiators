import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Ludi from '../pages/Ludi';
import Error from '../pages/Error';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NavShared from '../pages/NavShared';
import ProtectedRoute from '../pages/ProtectedRoute';

const getToken = () => {
  return localStorage.getItem('token') ? localStorage.getItem('token') : '';
};

const App = () => {
  const [token, setToken] = useState(getToken());
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<NavShared token={token} setToken={setToken} />}
        >
          <Route index element={<Login setToken={setToken} />} />
          <Route path='/register' element={<Register setToken={setToken} />} />
          <Route
            path='/ludi'
            element={
              <ProtectedRoute token={token}>
                <Ludi token={token} />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
