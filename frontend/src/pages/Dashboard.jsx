import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import BackdropSpinner from '../components/BackdropSpinner';
import Box from '@mui/material/Box';
import FilterBar from '../components/FilterBar';
import RecordForm from '../components/RecordForm';
import CloseConfirmDialog from '../components/CloseConfirmDialog';
import RecordDisplayBar from '../components/RecordDisplayBar';
import ConfirmDeleteRecordDialog from '../components/ConfirmDeleteRecordDialog';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import {Navigate} from 'react-router-dom';
import { getRecords } from '../features/records/recordsSlice';

function Dashboard() {
  const {
    openAddRecord,
    openEditRecord,
    openDeleteRecordConfirm,
    filters
  } = useSelector((state) => state.muiComponents);
  const {conceptFilter, typeFilter, categoryFilter} = filters;
  const {user} = useSelector((state) => state.auth);
  const {records, isLoading} = useSelector((state) => state.records);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !records[0]) dispatch(getRecords(user.token));
  }, [user, records, dispatch]);
  
  let arrayToDisplay = records.map(record => {return record});

  if (typeFilter && typeFilter !== 'None') {
    arrayToDisplay = arrayToDisplay.filter(record => {
      return record.operation_type === typeFilter;
    });
  };
  
  if (conceptFilter && conceptFilter !== 'None') {
    arrayToDisplay = arrayToDisplay.filter(record => {
      return record.concept === conceptFilter;
    });
  };

  if (categoryFilter && categoryFilter !== 'None') {
    arrayToDisplay = arrayToDisplay.filter(record => {
      return record.category === categoryFilter;
    });
  };

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');

  if (!user) {
    return (
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}} >
        <Typography variant="h2" color="secondary" sx={{m: 10}} >
          Welcome to Spends Checker!
        </Typography>
        <Typography variant="h3" color="primary">
          Login and get started!
        </Typography>
        <Box display="flex">
          <Button
            onClick={handleLogin}
            variant="contained"
            startIcon={<LockOutlinedIcon />}
            size="xl" 
            sx={{
              m: 8,
              width: 150,
              height: 50
            }}
          >
            Login
          </Button>
          <Button
            onClick={handleRegister}
            variant="contained"
            endIcon={<AccountCircleIcon />}
            color="secondary"
            sx={{
              m: 8,
              width: 150,
              height: 50
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}} >
      {isLoading && <BackdropSpinner />}
      {openAddRecord && <RecordForm parentToChild={{specifics: "create"}}/>}
      {openEditRecord && <RecordForm parentToChild={{specifics: "edit"}}/>}
      {openDeleteRecordConfirm && <ConfirmDeleteRecordDialog />}
      <CloseConfirmDialog />
      <FilterBar />
      {arrayToDisplay.map(record => {return <RecordDisplayBar key={record.record_uuid} parentToChild={record} />})}
    </Box>
  );
};

export default Dashboard;