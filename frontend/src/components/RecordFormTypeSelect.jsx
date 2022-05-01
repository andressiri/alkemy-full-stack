import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateRecordFormState} from '../features/muiComponents/muiComponentsSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function RecordFormTypeSelect({parentToChild}) {
  const {recordFormState} = useSelector((state) => state.muiComponents);
  const {operationType} = recordFormState;
  const [color, setColor] = useState('#bdbdbd');
  const dispatch = useDispatch();
  const {specifics} = parentToChild;
  const [readOnly, setReadOnly] = useState(false);
  if (specifics === 'edit') setReadOnly(true); 

  const handleChange = (event) => {
    const value = event.target.value
    const newState = {
      ...recordFormState,
      operationType: value
    };
    dispatch(updateRecordFormState(newState));
    const colorValue = value === 'None'
      ? '#bdbdbd'
      : value === 'Income'
        ? '#4caf50'
        : '#ef5350';
    setColor(colorValue);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="operationTypeLabel">Operation type *</InputLabel>
      <Select
        required
        labelId="operationTypeLabel"
        id="operationType"
        value={operationType}
        label="Operation type"
        onChange={handleChange}
        sx={{
          color: color
        }}
        inputProps={{ readOnly: readOnly }}
      >
        <MenuItem value={'Income'} sx={{color: '#4caf50'}}>Income</MenuItem>
        <MenuItem value={'Outcome'} sx={{color: '#ef5350'}}>Outcome</MenuItem>
      </Select>
    </FormControl>
  );
};

export default RecordFormTypeSelect;