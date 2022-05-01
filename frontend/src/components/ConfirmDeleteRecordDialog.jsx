import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'material-react-toastify';
import {resetMUIComponents} from '../features/muiComponents/muiComponentsSlice';
import BackdropSpinner from './BackdropSpinner';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { deleteRecord, resetRecordsReq } from '../features/records/recordsSlice';

function ConfirmDeleteRecordDialog() {
  const handleEffect = useRef(false);
  const {user} = useSelector((state) => state.auth);
  const {recordSelected} = useSelector((state) => state.muiComponents);
  const {isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.records 
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (handleEffect.current === false) return;

    if (isError) {
      toast.error(message);
    };

    if (isSuccess) {
      toast.success(message);
    };

    handleEffect.current = false;
    dispatch(resetRecordsReq());
    dispatch(resetMUIComponents());
  }, [isError, isSuccess, message, dispatch]);

  const handleClose = () => {
    dispatch(resetMUIComponents());
  };

  const handleCancel = () => {
    dispatch(resetMUIComponents());
  };

  const handleConfirm = () => {
    handleEffect.current = true;

    dispatch(deleteRecord({record_uuid: recordSelected, token: user.token}));
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {isLoading && <BackdropSpinner />}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete that record?
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

export default ConfirmDeleteRecordDialog;