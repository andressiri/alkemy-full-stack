import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logout, reset} from '../features/auth/authSlice';
import {changeDrawer} from '../features/drawer/drawerSlice';
import {useNavigate, useLocation} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);

  const handleChangeDrawer = () => {
    dispatch(changeDrawer());
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const handleGoToRegister = () => navigate('/register');
  const handleGoToLogin = () => navigate('/Login');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleChangeDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Spends Checker
          </Typography>
          {user
            ? <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            : location.pathname === '/login'
            ? <Button onClick={handleGoToRegister} color="inherit">
                Register
              </Button>
            : <Button onClick={handleGoToLogin} color="inherit">
                Login
              </Button>
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;