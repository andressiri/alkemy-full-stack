import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import {useBeforeunload} from 'react-beforeunload';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from './features/auth/authSlice';
import ChangeName from './pages/ChangeName';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Verification from './pages/Verification';
import DelAccConfirm from './components/DelAccConfirm';
import DeleteAccount from './components/DeleteAccount';
import Header from './components/Header';
import NavigationDrawer from './components/NavigationDrawer';
import Login from './pages/Login';
import PasswordToDelete from './components/PasswordToDelete';

function App() {
  const {user, remember} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useBeforeunload(() => {
    if (remember) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('remember', JSON.stringify(remember));
      return;
    };
    dispatch(logout());
  });

  return (
    <>
      <Router>
        <div>
          <Header />
          <NavigationDrawer />
          <DeleteAccount />
          <DelAccConfirm />
          <Routes>
            <Route path='/*' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/verification' element={<Verification />} />
            <Route path='/password' element={<ChangePassword />} />
            <Route path='/name' element={<ChangeName />} />
            <Route path='/delete-account' element={<PasswordToDelete />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
