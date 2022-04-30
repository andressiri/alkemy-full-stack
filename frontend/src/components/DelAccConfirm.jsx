import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'material-react-toastify';
import {changeDelAccConfirm} from '../features/muiComponents/muiComponentsSlice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DelAccConfirm() {
  const {openDelAccConfirm} = useSelector((state) => state.muiComponents);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(changeDelAccConfirm());
    toast.success('Account delete canceled');
    navigate('/');
  };

  const handleConfirm = () => {
    navigate('/delete-account');
    dispatch(changeDelAccConfirm());
  };

  return (
    <Dialog
      open={openDelAccConfirm}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure? All your infomation will be lost
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete your account? All the information
          associated will be destroyed and can't be recovered.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>
          Yes, I am sure!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DelAccConfirm;