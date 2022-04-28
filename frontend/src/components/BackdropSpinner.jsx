import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function BackdropSpinner() {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default BackdropSpinner