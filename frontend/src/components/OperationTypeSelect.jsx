import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import styled from '@emotion/styled';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function OperationTypeSelect() {
  const [type, setType] = useState('None');

  const StyledFormControl = styled(FormControl)({
  });
  
  const StyledLabel = styled(InputLabel)({
    "& .MuiFormLabel-root ": {
      opacity: 0.6,
      color: "red !important",
    },
  });

  const StyledSelect = styled(Select)({
    "& .MuiSvgIcon-root": {
      color: "#ba68c8"
    }
  });

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <StyledFormControl sx={{ m: 1, width: 150 }}>
      <StyledLabel color='secondary' id="operationTypeLabel">Operation type</StyledLabel>
      <StyledSelect
        labelId="operationTypeLabel"
        id="operationType"
        value={type}
        label="Operation type"
        onChange={handleChange}
        size='small'
        color='secondary'
        sx={{
          color: '#9c27b0'
        }}
      >
        <MenuItem value={'None'}>None</MenuItem>
        <MenuItem value={'Income'}>Income</MenuItem>
        <MenuItem value={'Outcome'}>Outcome</MenuItem>
      </StyledSelect>
    </StyledFormControl>
  );
};

export default OperationTypeSelect;