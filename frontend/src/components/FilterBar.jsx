import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeAddRecord} from '../features/muiComponents/muiComponentsSlice';
import Box from '@mui/material/Box';
import FilterBarAutocomplete from './FilterBarAutocomplete';
import OperationTypeSelect from './OperationTypeSelect';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function FilterBar() {
  const dispatch = useDispatch();

  const handleAddRecord = () => {
    dispatch(changeAddRecord());
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
        <Typography variant="h6" component="div" sx={{m: 1, color: '#ba68c8' }}>
          Filter
        </Typography>
        <FilterBarAutocomplete parentToChild={{specifics: 'Concept'}}/>
        <OperationTypeSelect />
        <FilterBarAutocomplete parentToChild={{specifics: 'Category'}}/>


        <Box sx={{display: 'flex', width: '150px', alignItems: 'center', justifyContent: 'center'}}>
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {}}
          >
            <RestartAltIcon fontSize="large"/>
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleAddRecord}
          >
            <AddCircleSharpIcon fontSize="large"/>
          </IconButton>
      </Box>
    </Box>
  );
};

export default FilterBar;