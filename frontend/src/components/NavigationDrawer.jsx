import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {logout, requirePasswordChange, resetAuth} from '../features/auth/authSlice';
import {resetRecords} from '../features/records/recordsSlice';
import {
  changeDrawer,
  changeDeleteAccount,
  resetMUIComponents
} from '../features/muiComponents/muiComponentsSlice';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import FaceIcon from '@mui/icons-material/Face';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';

function NavigationDrawer() {
  const {user} = useSelector((state) => state.auth);
  const {openDrawer} = useSelector((state) => state.muiComponents);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDrawer = () => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    };
    dispatch(changeDrawer());
  };

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');


  const handleChangeName = () => navigate('/name');

  const handleChangePassword = () => {
    dispatch(requirePasswordChange());
    navigate('/verification');
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetAuth());
    navigate('/login');
    dispatch(resetRecords());
    dispatch(resetMUIComponents());
  };

  const handleDeleteAccount = () => {
    dispatch(changeDeleteAccount());
  };

  return (
    <Drawer
      anchor={'right'}
      open={openDrawer}
      onClose={toggleDrawer()}
    >
      <Box
        sx={{width: 250}}
        role="presentation"
        onClick={toggleDrawer()}
        onKeyDown={toggleDrawer()}
      >
        <List>
          {!user

            ? <Divider>
                <ListItem button onClick={handleLogin}>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button onClick={handleRegister}>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItem>
              </Divider>
            : [{
                text:'Change name',
                icon: <FaceIcon />,
                onClick: handleChangeName
              }, {
                text: 'Change password',
                icon: <PasswordIcon />,
                onClick: handleChangePassword
              }, {
                text: 'Logout',
                icon: <LogoutIcon />,
                onClick: handleLogout
              }, {
                text: 'Delete account',
                icon: <NoAccountsIcon />,
                onClick: handleDeleteAccount
              }].map((obj) => (
                <ListItem button onClick={obj.onClick} key={obj.text}>
                  <ListItemIcon>
                    {obj.icon}
                  </ListItemIcon>
                  <ListItemText primary={obj.text} />
                </ListItem>
              ))
          }
        </List>
      </Box>
    </Drawer>
  );
};

export default NavigationDrawer;