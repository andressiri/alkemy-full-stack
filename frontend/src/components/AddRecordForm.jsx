import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'material-react-toastify';
import {resetMUIComponents} from '../features/muiComponents/muiComponentsSlice';
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
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


function AddRecordForm() {
  const [recordData, setRecordData] = useState({
    concept: '',
    amount: 0,
    date: '',
    operationType: '',
    category: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateRecord = () => {
  };

  const onChange = () => {
  };

  const handleCancel = () => {
  };

  const handleDateChange = () => {
  };

  //{isLoading && <BackdropSpinner />}

  //handle on close
  return (
    <Dialog open={true} fullWidth>
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
              onChange={onChange}
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label="Operation date"
                inputFormat="MM/DD/yyyy"
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
          <Link href='#' onClick={handleCancel} variant="body2" sx={{m: 2}}>
            Cancel
          </Link>
        </Box>
      </Container>
    </Dialog>
  );
};

export default AddRecordForm;