import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import BackdropSpinner from '../components/BackdropSpinner';
import FilterBar from '../components/FilterBar';
import AddRecordForm from '../components/AddRecordForm';
import CloseConfirmDialog from '../components/CloseConfirmDialog';

function Dashboard() {
  const {openAddRecord} = useSelector((state) => state.muiComponents);
  const {records, isLoading, isError, isSuccess, message} = useSelector((state) => state.records);

  return (
    <>
      {isLoading && <BackdropSpinner />}
      {openAddRecord && <AddRecordForm />}
      <CloseConfirmDialog />
      <FilterBar />
      {records.map(record => {return <p>{record.record_uuid}</p>})}
    </>
  );
};

export default Dashboard;