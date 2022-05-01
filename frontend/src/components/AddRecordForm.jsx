import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  changeAddRecord,
  changeCloseConfirm,
  updateAddRecordState,
  resetAddRecordState
} from '../features/muiComponents/muiComponentsSlice';
import {resetRecordsReq, saveRecord} from '../features/records/recordsSlice';
import {toast} from 'material-react-toastify';
import BackdropSpinner from './BackdropSpinner';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import AddRecordAutocomplete from './AddRecordAutocomplete';
import AddRecordTypeSelect from './AddRecordTypeSelect';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';


function AddRecordForm() {
  const {user} = useSelector((state) => state.auth);
  const {addRecordFormState} = useSelector((state) => state.muiComponents);
  const {concept, amount, date, operationType, category} = addRecordFormState;
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.records)
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess) {
      toast.success(message);
      dispatch(resetAddRecordState());
      dispatch(changeAddRecord());
    };

    dispatch(resetRecordsReq());
  }, [isError, isSuccess, message, dispatch]);

  const handleCreateRecord = (event) => {
    event.preventDefault();

    if (!concept || !amount || !date || !operationType) {
      toast.error('Please fill all required fields');
      return;
    };

    const recordData = {
      concept,
      amount,
      operation_date: date,
      operation_type: operationType,
      category
    };

    dispatch(saveRecord({recordData, token: user.token}));
  };

  const onAmountChange = (event) => {
    const newState = {
      ...addRecordFormState,
      amount: event.target.value
    };
    dispatch(updateAddRecordState(newState));
  };

  const handleOnCancel = () => {
    dispatch(changeAddRecord());
    dispatch(resetAddRecordState());
  };

  const handleOnClose = () => {
    if (!concept && !amount && !operationType && !category) {
      dispatch(changeAddRecord());
      dispatch(resetAddRecordState());
      return;
    };
    dispatch(changeCloseConfirm());
  };

  const handleDateChange = (newValue) => {
    console.log(newValue);
    const newState = {
      ...addRecordFormState,
      date: newValue._d.toString()
    };
    dispatch(updateAddRecordState(newState));
  };

  //handle on close
  return (
    <Dialog open={true} onClose={handleOnClose} fullWidth>
      {isLoading && <BackdropSpinner />}
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 5,
            marginBottom: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AddSharpIcon fontSize="large"/>
          </Avatar>
          <Typography component="h1" variant="h5" sx={{textAlign: 'center'}}>
            Create a new record
          </Typography>
          <Box component="form" onSubmit={handleCreateRecord} noValidate sx={{ mt: 1 }}>
            <AddRecordAutocomplete required parentToChild={{specifics: 'Concept', required: true}} />
            <TextField
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Amount"
              type="number"
              name="amount"
              onChange={onAmountChange}
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                value={Date.parse(date)}
                label="Operation date"
                inputFormat="DD/MM/yyyy"
                onChange={handleDateChange}
                renderInput={
                  (params) => <TextField
                    required
                    fullWidth
                    margin="normal"
                    {...params}
                  />
                }
              />
            </LocalizationProvider>
            <AddRecordTypeSelect />
            <AddRecordAutocomplete parentToChild={{specifics: 'Category'}} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create new record
            </Button>
          </Box>
          <Button onClick={handleOnCancel} variant="outlined" color="secondary" sx={{m: 2}}>
            Cancel
          </Button>
        </Box>
      </Container>
    </Dialog>
  );
};

export default AddRecordForm;