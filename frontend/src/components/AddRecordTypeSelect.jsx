import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function AddRecordTypeSelect() {
  const [type, setType] = useState('');

  const handleChange = (event) => {
    setType(event.target.value);
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
      >
        <MenuItem value={'Income'} sx={{color: '#4caf50'}}>Income</MenuItem>
        <MenuItem value={'Outcome'} sx={{color: '#ef5350'}}>Outcome</MenuItem>
      </Select>
    </FormControl>
  );
};

export default AddRecordTypeSelect;