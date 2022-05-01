import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeAddRecord} from '../features/muiComponents/muiComponentsSlice';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from '@emotion/styled';

function RecordDisplayBar({parentToChild}) {
  const handleEffect = useRef(false);
  const dispatch = useDispatch();
  const {recordFormState} = useSelector((state) => state.muiComponents);
  const {concept, amount, date, operationType, category} = recordFormState;
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.records);
  const backgroundColor = useRef('#ef5350');
  if (parentToChild.operation_type === 'Income') backgroundColor.current = '#4caf50';

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

  const handleAddRecord = () => {
    dispatch(changeAddRecord());
  };

  const handleOnClick = () => {
    console.log(parentToChild);
  };

  return (
    <Box
    direction="row"
    sx={{
      maxWidth: 900,
      m: 2,
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
        onClick={handleOnClick}
        disabled
        id={`${parentToChild.record_uuid}Concept`}
        label="Concept"
        size="small"
        defaultValue={parentToChild.concept}
        sx={{m: 1, p: 0, width: 200}}
      />
      <StyledDisabledTextField
        disabled
        id={`${parentToChild.record_uuid}Amount`}
        label="Amount"
        size="small"
        defaultValue={parentToChild.amount}
        sx={{m: 1, width: 100}}
      />
      <StyledDisabledTextField
        disabled
        id={`${parentToChild.record_uuid}Date`}
        label="Date"
        size="small"
        defaultValue={parentToChild.operation_date.toString()}
        sx={{m: 1,  width: 115}}
      />
      <StyledDisabledTextField
        disabled
        id={`${parentToChild.record_uuid}Date`}
        label="Category"
        size="small"
        defaultValue={parentToChild.category}
        sx={{m: 1,  width: 150}}
      />
      <Box sx={{display: 'flex', width: '150px', alignItems: 'center', justifyContent: 'center'}}>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          onClick={() => {}}
        >
          <DeleteIcon fontSize="large" sx={{color: 'white'}} />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          onClick={() => {}}
        >
          <EditIcon fontSize="large" sx={{color: 'white'}} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default RecordDisplayBar;