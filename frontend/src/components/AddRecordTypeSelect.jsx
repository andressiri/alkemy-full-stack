import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function AddRecordTypeSelect() {
  const [type, setType] = useState('');
  const [color, setColor] = useState('#bdbdbd');

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
    <FormControl fullWidth margin="normal">
      <InputLabel id="operationTypeLabel">Operation type</InputLabel>
      <Select
        required
        labelId="operationTypeLabel"
        id="operationType"
        value={type}
        label="Operation type"
        onChange={handleChange}
        sx={{
          color: color
        }}
      >
        <MenuItem value={'Income'} sx={{color: '#4caf50'}}>Income</MenuItem>
        <MenuItem value={'Outcome'} sx={{color: '#ef5350'}}>Outcome</MenuItem>
      </Select>
    </FormControl>
  );
};

export default AddRecordTypeSelect;