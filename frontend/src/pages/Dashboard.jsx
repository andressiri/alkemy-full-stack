import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import BackdropSpinner from '../components/BackdropSpinner';
import Box from '@mui/material/Box';
import FilterBar from '../components/FilterBar';
import RecordForm from '../components/RecordForm';
import CloseConfirmDialog from '../components/CloseConfirmDialog';
import RecordDisplayBar from '../components/RecordDisplayBar';
import ConfirmDeleteRecordDialog from '../components/ConfirmDeleteRecordDialog';

function Dashboard() {
  const {
    openAddRecord,
    openEditRecord,
    openDeleteRecordConfirm
  } = useSelector((state) => state.muiComponents);
  const {records, isLoading, isError, isSuccess, message} = useSelector((state) => state.records);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
      {isLoading && <BackdropSpinner />}
      {openAddRecord && <RecordForm parentToChild={{specifics: 'create'}}/>}
      {openEditRecord && <RecordForm parentToChild={{specifics: 'edit'}}/>}
      {openDeleteRecordConfirm && <ConfirmDeleteRecordDialog />}
      <CloseConfirmDialog />
      <FilterBar />
      {records.map(record => {return <RecordDisplayBar key={record.record_uuid} parentToChild={record} />})}
    </Box>
  );
};

export default Dashboard;