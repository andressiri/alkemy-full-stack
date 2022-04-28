import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'material-react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import {sendCode, checkCode, reset} from '../features/auth/authSlice';
import validateEmail from '../functions/validateEmail';
import BackdropSpinner from '../components/BackdropSpinner';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MailLockIcon from '@mui/icons-material/MailLock';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Verification() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const emailSentTo = useRef('');

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth 
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    };

    if (isSuccess) {
      if (emailSentTo.current && !emailSent) {
        setEmailSent(true);
      };

      if (emailSentTo.current && code) {
        if (!user) {
          navigate('/login')
        } else {
          navigate('/');
        };
      };

      toast.success(message);
    };

   dispatch(reset());
  }, [user, isError, isSuccess, message, code, emailSent, navigate, dispatch]);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSendCode = (event) => {
    event.preventDefault();

    if (!user && !email) {
      toast.error('Please enter an email');
      return;
    };

    if (!user && !validateEmail(email)) {
      toast.error('Please enter a valid email');
      return;
    };
    
    emailSentTo.current = user ? user.email : email;

    dispatch(sendCode(email));
  };

  const handleCheckCode = (event) => {
    event.preventDefault();

    if (!code) {
      toast.error('Please enter the code sent');
      return;
    };

    dispatch(checkCode(code));
  };

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
          {emailSentTo.current ? <MarkEmailUnreadIcon /> : <MailLockIcon />}
        </Avatar>
        <Typography component="h1" variant="h5">
          Identity verification
        </Typography>
        <Box component="form" onSubmit={handleSendCode} noValidate sx={{ mt: 2 }}>
          {!user &&
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onEmailChange}
            />
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 0, mb: 2 }}
          >
            Send email
          </Button>
        </Box>
        <Box component="form" onSubmit={handleCheckCode} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="code"
            label="Code"
            type="text"
            id="code"
            onChange={onCodeChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 0, mb: 2 }}
          >
            Check code
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Verification;