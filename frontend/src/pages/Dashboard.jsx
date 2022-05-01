import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import BackdropSpinner from '../components/BackdropSpinner';
import FilterBar from '../components/FilterBar';
import RecordForm from '../components/RecordForm';
import CloseConfirmDialog from '../components/CloseConfirmDialog';

function Dashboard() {
  const {openAddRecord, openEditRecord} = useSelector((state) => state.muiComponents);
  const {records, isLoading, isError, isSuccess, message} = useSelector((state) => state.records);

  return (
    <>
      {isLoading && <BackdropSpinner />}
      {openAddRecord && <RecordForm parentToChild={{specifics: 'create'}}/>}
      {openEditRecord && <RecordForm parentToChild={{specifics: 'edit'}}/>}
      <CloseConfirmDialog />
      <FilterBar />
      {records.map(record => {return <p>{record.record_uuid}</p>})}
    </>
  );
};

export default Dashboard;