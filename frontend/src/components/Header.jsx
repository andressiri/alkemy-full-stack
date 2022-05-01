import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logout, reset} from '../features/auth/authSlice';
import {changeDrawer} from '../features/muiComponents/muiComponentsSlice';
import {useNavigate, useLocation} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PaidIcon from '@mui/icons-material/Paid';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const {recordsAdditionResult} = useSelector((state) => state.records);

  const handleChangeDrawer = () => {
    dispatch(changeDrawer());
  };

  const handleGoToDashboard = () => {
    navigate('/');
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const handleGoToRegister = () => navigate('/register');
  const handleGoToLogin = () => navigate('/login');

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
            onClick={handleGoToDashboard}
          >
            <PaidIcon fontSize="large" color="secondary" />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={handleGoToDashboard}
          >
            Spends Checker
          </Typography>
          <Box sx={{ 
              p: 2.5,
              backgroundColor: 'red',
              height: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex'
            }}
          >
            Save
          </Box>
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

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;