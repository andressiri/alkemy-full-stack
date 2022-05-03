import React, {useState} from 'react';
import styled from '@emotion/styled';
import {useSelector, useDispatch} from 'react-redux';
import {updateTypeFilter} from '../features/muiComponents/muiComponentsSlice';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function FilterBarTypeSelect() {
  const [color, setColor] = useState('#bdbdbd');
  const {typeFilter} = useSelector((state) => state.muiComponents);
  const dispatch = useDispatch();

  const StyledFormControl = styled(FormControl)({ //TODO

  });
  
  const StyledLabel = styled(InputLabel)({ //TODO

  });

  const StyledSelect = styled(Select)({
    "& .MuiSvgIcon-root": {
      color: "#ba68c8"
    },
  });

  const handleChange = (event) => {
    const value = event.target.value
    dispatch(updateTypeFilter(value));
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
        value={typeFilter}
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

export default FilterBarTypeSelect;