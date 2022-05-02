import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'material-react-toastify';
import {changeName, resetAuthReq} from '../features/auth/authSlice';
import BackdropSpinner from '../components/BackdropSpinner';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import FaceIcon from '@mui/icons-material/Face';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function ChangeName() {
  const [name, setName] = useState('');
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
      toast.success(message);
      navigate('/');
    };

    if (!user) {
      navigate('/');
    };

    dispatch(resetAuthReq());
  }, [isError, isSuccess, message, user, navigate, dispatch]);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const handleChangeName = (event) => {
    event.preventDefault();

    if (!name) {
      toast.error('Please enter a new name');
      return;
    };

    dispatch(changeName({
      name,
      token: user ? user.token : null
    }));
  };

  const handleCancel = () => {
    navigate('/login');
  };

  if (!user) return (<></>);

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
          <FaceIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change name
        </Typography>
        <Box component="form" onSubmit={handleChangeName} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="New name"
            type="text"
            id="name"
            autoComplete="name"
            onChange={onNameChange}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Change name
          </Button>
        </Box>
        <Link href='#' onClick={handleCancel} variant="body2">
            Cancel
        </Link>
      </Box>
    </Container>
  );
};

export default ChangeName;