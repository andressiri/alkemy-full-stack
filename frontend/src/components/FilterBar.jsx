import React from 'react';
import {useDispatch} from 'react-redux';
import {changeAddRecord, resetFilters} from '../features/muiComponents/muiComponentsSlice';
import Box from '@mui/material/Box';
import FilterBarAutocomplete from './FilterBarAutocomplete';
import OperationTypeSelect from './OperationTypeSelect';
import IconButton from '@mui/material/IconButton';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

function FilterBar() {
  const dispatch = useDispatch();

  const handleAddRecord = () => {
    dispatch(changeAddRecord());
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <Box
      direction="row"
      sx={{
        width: 'unset',
        m: 3,
        p: 1,
        border: '1px solid #ba68c8',
        borderRadius: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center' 
      }}
    >
      <FilterBarAutocomplete parentToChild={{specifics: 'Concept'}}/>
      <OperationTypeSelect />
      <FilterBarAutocomplete parentToChild={{specifics: 'Category'}}/>
      <Box sx={{m: 0, display: 'flex', width: '150px', alignItems: 'center', justifyContent: 'center'}}>
        <IconButton
          size="large"
          edge="start"
          color="secondary"
          aria-label="menu"
          onClick={handleResetFilters}
        >
          <ReplayCircleFilledIcon fontSize="large"/>
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="secondary"
          aria-label="menu"
          onClick={handleAddRecord}
        >
          <AddCircleSharpIcon fontSize="large"/>
        </IconButton>
      </Box>
    </Box>
  );
};

export default FilterBar;