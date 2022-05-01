import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import FilterBar from '../components/FilterBar';
import AddRecordForm from '../components/AddRecordForm';
import CloseConfirmDialog from '../components/CloseConfirmDialog';

function Dashboard() {
  const {openAddRecord} = useSelector((state) => state.muiComponents);

  return (
    <>
      {openAddRecord && <AddRecordForm />}
      <CloseConfirmDialog />
      <FilterBar />
    </>
  );
};

export default Dashboard;