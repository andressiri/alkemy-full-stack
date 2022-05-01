import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {resetMUIComponents, changeCloseConfirm} from '../features/muiComponents/muiComponentsSlice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

function CloseConfirmDialog() {
  const {openCloseConfirm} = useSelector((state) => state.muiComponents);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(changeCloseConfirm());
  };

  const handleCancel = () => {
    dispatch(changeCloseConfirm());
  };

  const handleConfirm = () => {
    dispatch(resetMUIComponents());
  };

  return (
    <Dialog
      open={openCloseConfirm}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Cancel the new operation?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>No</Button>
        <Button onClick={handleConfirm} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CloseConfirmDialog;