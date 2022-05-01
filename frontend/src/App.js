import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useBeforeunload} from 'react-beforeunload';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from './features/auth/authSlice';
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
import DeleteAccount from './components/DeleteAccount';
import DelAccConfirm from './components/DelAccConfirm';
import PasswordToDelete from './components/PasswordToDelete';

function App() {
  const {user, remember} = useSelector((state) => state.auth);
  const {records} = useSelector((state) => state.records);
  const dispatch = useDispatch();

  useBeforeunload(() => {
    if (remember) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('remember', JSON.stringify(remember));
      localStorage.setItem('records', JSON.stringify(records));
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
