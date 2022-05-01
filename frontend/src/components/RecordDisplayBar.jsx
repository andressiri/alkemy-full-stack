import React, {useRef} from 'react';
import {useDispatch} from 'react-redux';
import {
  changeDeleteRecordConfirm,
  changeEditRecord,
  updateRecordFormState,
  updateRecordSelected
} from '../features/muiComponents/muiComponentsSlice';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from '@emotion/styled';

function RecordDisplayBar({parentToChild}) {
  const dispatch = useDispatch();
  const {record_uuid, concept, amount, operation_date, operation_type, category} = parentToChild;
  const backgroundColor = useRef('#ef5350');
  if (operation_type === 'Income') backgroundColor.current = '#4caf50';

  const StyledDisabledTextField = styled(TextField)({
    "& .Mui-disabled": {
      color: "white",
      WebkitTextFillColor: 'white',
      borderColor: 'white !important'
    },
    "& .MuiOutlinedInput-notchedOutline": {
      color: "white",
      WebkitTextFillColor: 'white',
      borderColor: 'white !important'
    },
  });

  const handleEditRecord = () => {
    const recordData = {
      concept,
      amount: parseFloat(amount),
      date: operation_date,
      operationType: operation_type,
      category
    };

    dispatch(updateRecordSelected(record_uuid));
    dispatch(updateRecordFormState(recordData));
    dispatch(changeEditRecord());
  };

  const handleDeleteRecord = () => {
    dispatch(updateRecordSelected(record_uuid));
    dispatch(changeDeleteRecordConfirm());
  }

  return (
    <Box
    direction="row"
    sx={{
      maxWidth: 900,
      m: 1,
      p: 1,
      backgroundColor: `${backgroundColor.current}`,
      borderRadius: 4,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center' 
    }}
    >
      <StyledDisabledTextField
        disabled
        id={`${record_uuid}Concept`}
        label="Concept"
        size="small"
        defaultValue={concept}
        sx={{m: 1, p: 0, width: 200}}
      />
      <StyledDisabledTextField
        disabled
        id={`${record_uuid}Amount`}
        label="Amount"
        size="small"
        defaultValue={amount}
        sx={{m: 1, width: 100}}
      />
      <StyledDisabledTextField
        disabled
        id={`${record_uuid}Date`}
        label="Date"
        size="small"
        defaultValue={operation_date.toString()}
        sx={{m: 1,  width: 115}}
      />
      <StyledDisabledTextField
        disabled
        id={`${record_uuid}Date`}
        label="Category"
        size="small"
        defaultValue={category}
        sx={{m: 1,  width: 150}}
      />
      <Box sx={{display: 'flex', width: '150px', alignItems: 'center', justifyContent: 'center'}}>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          onClick={handleDeleteRecord}
        >
          <DeleteIcon fontSize="large" sx={{color: 'white'}} />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          onClick={handleEditRecord} 
        >
          <EditIcon fontSize="large" sx={{color: 'white'}} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default RecordDisplayBar;