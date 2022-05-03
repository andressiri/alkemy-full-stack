import React, {useLayoutEffect, useState} from 'react';
import styled from '@emotion/styled';
import {useSelector, useDispatch} from 'react-redux';
import {updateTypeFilter} from '../features/muiComponents/muiComponentsSlice';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function FilterBarTypeSelect() {
  const [color, setColor] = useState('#ba68c8');
  const [focusColor, setFocusColor] = useState('#9c27b0');
  const [hoverColor, setHoverColor] = useState('#7b1fa2');
  const {typeFilter} = useSelector((state) => state.muiComponents);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    let auxColor = '#ba68c8';
    let auxFocusColor = '#9c27b0';
    let auxHoverColor = '#7b1fa2';

    if (typeFilter === 'Income') {
      auxColor = '#4caf50';
      auxFocusColor = '#2e7d32';
      auxHoverColor = '#1b5e20';
    };

    if (typeFilter === 'Outcome') {
      auxColor = '#ef5350';
      auxFocusColor = '#d32f2f';
      auxHoverColor = '#c62828';
    };

    setColor(auxColor);
    setFocusColor(auxFocusColor);
    setHoverColor(auxHoverColor);
  }, [typeFilter]);

  const StyledFormControl = styled(FormControl)({
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      color: `${color}99`,
    },
    "& .MuiInputLabel-shrink": {
      color: color,
    },
    "& .MuiSvgIcon-root": {
      color: color
    },
    '& .MuiOutlinedInput-notchedOutline:not(.Mui-disabled)': {
      borderColor: color,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline:not(.Mui-disabled)': {
      borderColor: focusColor,
    },
    '&:hover .MuiOutlinedInput-notchedOutline:not(.Mui-disabled)': {
      borderColor: hoverColor,
    }
  });

  const handleChange = (event) => dispatch(updateTypeFilter(event.target.value));

  return (
    <StyledFormControl sx={{ m: 1, width: 150 }}>
      <InputLabel
        id="operationTypeLabel"
        size="small"
        color="secondary"
        sx={{color: `${color}99`}}
      >
        Operation type
      </InputLabel>
      <Select
        labelId="operationTypeLabel"
        id="operationType"
        value={typeFilter}
        label="Operation type"
        onChange={handleChange}
        size="small"
        color="secondary"
        sx={{
          borderColor: color,
          color: color
        }}
      >
        <MenuItem value={'Income'} sx={{color: '#4caf50'}}>Income</MenuItem>
        <MenuItem value={'Outcome'} sx={{color: '#ef5350'}}>Outcome</MenuItem>
        <MenuItem value={'None'}>None</MenuItem>
      </Select>
    </StyledFormControl>
  );
};

export default FilterBarTypeSelect;