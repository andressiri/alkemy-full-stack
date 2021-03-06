import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import useLogout from '../functions/useLogout.js'
import {changeDrawer} from '../features/muiComponents/muiComponentsSlice';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import PaidIcon from '@mui/icons-material/Paid';

function Header() {
  const {user} = useSelector((state) => state.auth);
  const {recordsAdditionResult} = useSelector((state) => state.records);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();
  let additionColor = '#ef5350';
  if (recordsAdditionResult > 0) additionColor = '#4caf50';
 
  const handleChangeDrawer = () => dispatch(changeDrawer());

  const handleGoToDashboard = () => navigate('/');
  
  const handleGoToLogin = () => navigate('/login');
  
  const handleGoToRegister = () => navigate('/register');
  
  const handleLogout = () => logout();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box 
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
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
            {window.innerWidth > 600 &&
              <Typography
              variant="h6"
              component="div"
              sx={{cursor: 'pointer' }}
              onClick={handleGoToDashboard}
              >
                Spends Checker
              </Typography>
            }
          </Box>
          {(user && user.verified === true) && 
            <Box 
              sx={{
                mr: 2,
                p: 2.5,
                backgroundColor: additionColor,
                height: 5,
                width: 40,
                borderRadius: 2,
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
              }}
            >
              <Typography>
                {recordsAdditionResult}
              </Typography>
            </Box>
          }
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
            sx={{ mr: 2}}
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