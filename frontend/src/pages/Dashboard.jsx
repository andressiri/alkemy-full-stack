import React from 'react';
import FilterBar from '../components/FilterBar';
import AddRecordForm from '../components/AddRecordForm';

function Dashboard() {
  return (
    <>
      {false && <AddRecordForm />}
      <FilterBar />
    </>
  );
};

export default Dashboard;