import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import useLogout from '../functions/useLogout';
import {requirePasswordChange} from '../features/auth/authSlice';
import {changeDrawer, changeDeleteAccount} from '../features/muiComponents/muiComponentsSlice';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FaceIcon from '@mui/icons-material/Face';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import PasswordIcon from '@mui/icons-material/Password';

function NavigationDrawer() {
  const {user} = useSelector((state) => state.auth);
  const {openDrawer} = useSelector((state) => state.muiComponents);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = useLogout();

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
    logout();
    dispatch(changeDrawer());
  };

  const handleDeleteAccount = () => dispatch(changeDeleteAccount());

  let arrayToDisplay = [{
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
    }
  ];

  if (!user) arrayToDisplay = [{
      text:'Register',
      icon: <AccountCircleIcon />,
      onClick: handleRegister
    }, {
      text: 'Login',
      icon: <LoginIcon />,
      onClick: handleLogin
    },
  ];

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
          {arrayToDisplay.map((obj) => (
            <ListItem button onClick={obj.onClick} key={obj.text}>
              <ListItemIcon>
                {obj.icon}
              </ListItemIcon>
              <ListItemText primary={obj.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default NavigationDrawer;