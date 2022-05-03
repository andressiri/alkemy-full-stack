import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'material-react-toastify';
import {changePassword, resetAuthReq, resetToken} from '../features/auth/authSlice';
import useLogout from '../functions/useLogout';
import BackdropSpinner from '../components/BackdropSpinner';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function ChangePassword() {
  const [formData, setFormData] = useState({
    password: '',
    password2: ''
  });
  const {password, password2} = formData;
  const {
    user,
    isLoading,
    isError,
    isSuccess,
    message,
    temporaryToken
  } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = useLogout();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    };

    if (isSuccess) {
      toast.success(message);
      logout();
      navigate('/login');
    };

    if (!temporaryToken) {
      navigate('/');
    };

    dispatch(resetAuthReq());
  }, [isError, isSuccess, message, temporaryToken, navigate, dispatch]);

  const onInputChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const handleChangePassword = (event) => {
    event.preventDefault();

    if (!password || !password2) {
      toast.error('Please fill all fields');
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

    dispatch(changePassword({password, temporaryToken}));
  };

  const handleGoToLogin = () => {
    if (!user) {
      logout();
    } else {
      dispatch(resetToken());
      navigate('/login');
    };
  };

  if (!temporaryToken) return (<></>);

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
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change password
        </Typography>
        <Box component="form" onSubmit={handleChangePassword} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onInputChange}
            autoFocus
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
            Change password
          </Button>
        </Box>
        <Link href='#' onClick={handleGoToLogin} variant="body2">
            Cancel
        </Link>
      </Box>
    </Container>
  );
};

export default ChangePassword;