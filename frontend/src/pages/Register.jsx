import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'material-react-toastify';
import {register, resetAuthReq, requireVerification} from '../features/auth/authSlice';
import validateEmail from '../functions/validateEmail';
import BackdropSpinner from '../components/BackdropSpinner';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const {name, email, password, password2} = formData;
  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth 
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    };

    if (isSuccess || user) {
      if (user && user.verified) {
        navigate('/');
      } else {
        dispatch(requireVerification());
        navigate('/verification');
      }

      if (isSuccess) toast.success('Thanks for joining us!');
    };

    dispatch(resetAuthReq());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onInputChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (!name || !email || !password || !password2) {
      toast.error('Please fill all fields');
      return;
    };

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email');
      return;
    };

    if (password.length < 6) {
      toast.error('Password should have at least six characters');
      return;
    };

    if (password !== password2) {
      toast.error('Passwords do not match');
      return;
    };

    const userData = {
      name,
      email,
      password
    };

    dispatch(register(userData));
  };

  const handleGoToLogin = () => navigate('/login');

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
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={onInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm password"
            type="password"
            id="password2"
            autoComplete="current-password"
            onChange={onInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
        <Link href='#' onClick={handleGoToLogin} variant="body2">
            Already registered? Go to login
        </Link>
      </Box>
    </Container>
  );
};

export default Register;