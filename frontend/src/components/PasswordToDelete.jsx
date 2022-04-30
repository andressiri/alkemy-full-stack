import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'material-react-toastify';
import {deleteAccount, logout, resetToken, reset} from '../features/auth/authSlice';
import {resetMUIComponents} from '../features/muiComponents/muiComponentsSlice';
import BackdropSpinner from './BackdropSpinner';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function PasswordToDelete() {
  const [password, setPassword] = useState('');
  const {user, isLoading, isError, isSuccess, message, temporaryToken} = useSelector(
    (state) => state.auth 
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    };

    if (isSuccess) {
      dispatch(resetToken());
      dispatch(logout());
      dispatch(resetMUIComponents());
      toast.success(message);
      navigate('/');
    };

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClose = () => {
    toast.success('Account delete canceled');
    navigate('/');
    dispatch(resetMUIComponents());
  };

  const handleDelete = () => {
    if (!password) {
      toast.error('Please enter your password')
      return;
    };

    dispatch(deleteAccount({password, temporaryToken, user}));
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      {isLoading && <BackdropSpinner />}
      <DialogTitle>Enter your password to finish</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To delete your account, please enter your password here.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          onChange={passwordChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordToDelete;