import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import styled from '@emotion/styled';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function OperationTypeSelect() {
  const [type, setType] = useState('None');
  const [color, setColor] = useState('#bdbdbd');

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
    const value = event.target.value
    setType(value);
    const colorValue = value === 'None'
      ? '#bdbdbd'
      : value === 'Income'
        ? '#4caf50'
        : '#ef5350';
    setColor(colorValue);
  };

  return (
    <StyledFormControl sx={{ m: 1, width: 150 }}>
      <StyledLabel id="operationTypeLabel">Operation type</StyledLabel>
      <StyledSelect
        labelId="operationTypeLabel"
        id="operationType"
        value={type}
        label="Operation type"
        onChange={handleChange}
        size='small'
        color='secondary'
        sx={{
          color: color
        }}
      >
        <MenuItem value={'None'}>None</MenuItem>
        <MenuItem value={'Income'} sx={{color: '#4caf50'}}>Income</MenuItem>
        <MenuItem value={'Outcome'} sx={{color: '#ef5350'}}>Outcome</MenuItem>
      </StyledSelect>
    </StyledFormControl>
  );
};

export default OperationTypeSelect;