import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'material-react-toastify';
import {login, reset, requireVerification} from '../features/auth/authSlice';
import validateEmail from '../functions/validateEmail';
import BackdropSpinner from '../components/BackdropSpinner';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const {email, password, remember} = formData;
  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth 
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    };

    if (isSuccess && !user) {
      toast.success('You are now logged in');
    };

    if (user) {
      if (user.verified) {
        navigate('/');
      } else {
        dispatch(requireVerification());
        navigate('/verification');
      };
    };

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onInputChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const onRememberChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      remember: event.target.checked
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    };

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email');
      return;
    };
    
    const userData = {
      email,
      password,
      remember
    };

    dispatch(login(userData));
  };

  const handleGoToRegister = () => navigate('/register');

  if (user) return (<></>);

  return (
    <Container component="main" maxWidth="xs">
      {isLoading && <BackdropSpinner />}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onInputChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            onChange={onRememberChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' onClick={handleGoToRegister} variant="body2">
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;