import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useBeforeunload} from 'react-beforeunload';
import {useSelector, useDispatch} from 'react-redux';
import {logout, resetToken} from './features/auth/authSlice';
import Header from './components/Header';
import NavigationDrawer from './components/NavigationDrawer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

import {ToastContainer} from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import Verification from './pages/Verification';
import ChangePassword from './pages/ChangePassword';
import ChangeName from './pages/ChangeName';

function App() {
  const {remember} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useBeforeunload(() => {
    dispatch(resetToken());
    if (remember) return;
    dispatch(logout());
  });

  return (
    <>
      <Router>
        <div>
          <Header />
          <NavigationDrawer />
          <Routes>
            <Route path='/*' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/verification' element={<Verification />} />
            <Route path='/password' element={<ChangePassword />} />
            <Route path='/name' element={<ChangeName />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
