import React, {useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'material-react-toastify';
import {
  changeCloseConfirm,
  updateRecordFormState,
  resetRecordFormState,
  resetMUIComponents,
  resetMUIDialogs
} from '../features/muiComponents/muiComponentsSlice';
import {resetRecordsReq, saveRecord, updateRecord} from '../features/records/recordsSlice';
import RecordFormAutocomplete from './RecordFormAutocomplete';
import RecordFormTypeSelect from './RecordFormTypeSelect';
import BackdropSpinner from './BackdropSpinner';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import EditIcon from '@mui/icons-material/Edit';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';


function RecordForm({parentToChild}) {
  const handleEffect = useRef(false);
  const {user} = useSelector((state) => state.auth);
  const {recordFormState, recordSelected} = useSelector((state) => state.muiComponents);
  const {concept, amount, date, operationType, category} = recordFormState;
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.records);
  const {specifics} = parentToChild;
  const dispatch = useDispatch();

  useEffect(() => {
    if (handleEffect.current === false) return;

    if (isError) toast.error(message);

    if (isSuccess) {
      toast.success(message);
      if (specifics === 'edit') {
        dispatch(resetRecordFormState());
        dispatch(resetMUIDialogs());
      } else {
        dispatch(resetMUIComponents());
      };
    };

    dispatch(resetRecordsReq());
    handleEffect.current = false;
  }, [isError, isSuccess, message, specifics, dispatch]);

  const handleRecordFormAction = (event) => {
    event.preventDefault();

    if (!concept || !amount || !date || !operationType) {
      toast.error('Please fill all required fields');
      return;
    };

    handleEffect.current = true;

    const recordData = {
      record_uuid: recordSelected,
      concept,
      amount,
      operation_date: date,
      operation_type: operationType,
      category
    };
    
    if (specifics === 'edit') {
      dispatch(updateRecord({recordData, token: user.token}));
    } else {
      dispatch(saveRecord({recordData, token: user.token}));
    };
  };

  const onAmountChange = (event) => {
    const newState = {
      ...recordFormState,
      amount: event.target.value
    };
    dispatch(updateRecordFormState(newState));
  };

  const handleOnCancel = () => {
    dispatch(resetMUIDialogs());
    dispatch(resetRecordFormState());
  };

  const handleOnClose = () => {
    if (!concept && !amount && !operationType && !category) {
      dispatch(resetMUIDialogs());
      dispatch(resetRecordFormState());
      return;
    };
    dispatch(changeCloseConfirm());
  };

  const handleDateChange = (newValue) => {
    const newState = {
      ...recordFormState,
      date: newValue._d.toString()
    };
    dispatch(updateRecordFormState(newState));
  };

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
            {specifics === 'edit' 
              ? <EditIcon />
              : <AddSharpIcon fontSize="large"/>
            }
          </Avatar>
          <Typography component="h1" variant="h5" sx={{textAlign: 'center'}}>
            {specifics === 'edit'
              ? 'Edit record'
              : 'Create a new record'
            }
          </Typography>
          <Box component="form" onSubmit={handleRecordFormAction} noValidate sx={{ mt: 1 }}>
            <RecordFormAutocomplete
              required
              parentToChild={{specifics: 'Concept', required: true}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="amount"
              value={amount}
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
            <RecordFormTypeSelect parentToChild={{specifics: specifics}}/>
            <RecordFormAutocomplete parentToChild={{specifics: 'Category'}} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {specifics === 'edit'
                ? 'Edit record' 
                : 'Create new record'
              }
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

export default RecordForm;