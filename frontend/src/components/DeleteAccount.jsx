import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {resetMUIDialogs} from '../features/muiComponents/muiComponentsSlice';
import {requireAccountDelete} from '../features/auth/authSlice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DeleteAccount() {
  const {openDeleteAccount} = useSelector((state) => state.muiComponents);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(resetMUIDialogs());
  };

  const handleConfirm = () => {
    dispatch(requireAccountDelete());
    navigate('/verification');
    dispatch(resetMUIDialogs());
  };

  return (
    <Dialog
      open={openDeleteAccount}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Do you want to delete your account?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          To delete your account, first confirm
          your identity please.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteAccount;