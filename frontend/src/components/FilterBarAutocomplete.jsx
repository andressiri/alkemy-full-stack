import React from 'react';
import styled from '@emotion/styled';
import {useSelector, useDispatch} from 'react-redux';
import {updateConceptFilter, updateCategoryFilter} from '../features/muiComponents/muiComponentsSlice';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

function FilterBarAutocomplete({parentToChild}) {
  const filter = createFilterOptions();
  const {conceptFilter, categoryFilter} = useSelector((state) => state.muiComponents);
  const {specifics} = parentToChild;
  let value = conceptFilter;
  if (specifics === 'Category') value = categoryFilter;
  const dispatch = useDispatch();

  const StyledAutocomplete = styled(Autocomplete)({
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      color: "#ba68c899",
    },
    "& .MuiInputLabel-shrink": {
      color: "#ba68c8",
    },
    "& .MuiSvgIcon-root": {
      color: "#ba68c8",
      margin: -3
    },
    '& .MuiOutlinedInput-root': {
      paddingRight: "45px !important"
    },
    "& .MuiAutocomplete-inputRoot": {
      color: "#ba68c8",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ba68c8"
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#9c27b0"
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#7b1fa2"
      }
    }
  });

  const concepts = [
    {content: 'Accounting expenditures'},
    {content: 'Advertising'},
    {content: 'Insurance'},
    {content: 'Legal Fees'},
    {content: 'Material costs'},
    {content: 'Professional fees'},
    {content: 'Rent'},
    {content: 'Repair'},
    {content: 'Return of purchases'},
    {content: 'Sales'},
    {content: 'Services provided'},
    {content: 'Supplies'},
    {content: 'Surchage on sales'},
    {content: 'Taxes'},
    {content: 'Travel expenses'},
    {content: 'None'}
  ];

  const categories = [
    {content: 'Food'},
    {content: 'Gym'},
    {content: 'Office'},
    {content: 'Personal'},
    {content: 'Presents'},
    {content: 'None'},
  ];

  const setOptions = () => {
    switch (specifics) {
      case 'Concept': return concepts;
      case 'Category': return categories;
      // no default
    };
  };

  const onAutcompleteChange = (event, newValue) => {
    if (newValue === null) newValue = {content: ''};
    let valueToSend = {content: ''}

    if (typeof newValue === 'string') {
      valueToSend = newValue;
    } else if (newValue && newValue.inputValue) {
      valueToSend = newValue.inputValue;
    } else {
      valueToSend = newValue.content;
    };

    if (specifics === 'Concept') {
      dispatch(updateConceptFilter(valueToSend));
    } else {
      dispatch(updateCategoryFilter(valueToSend));
    };
  };

  const autocompleteFilterOptions = (options, params) => {
    const filtered = filter(options, params);
    const { inputValue } = params;

    // Suggest the creation of a new value
    const isExisting = options.some((option) => inputValue === option.content);
    if (inputValue !== '' && !isExisting) {
      filtered.push({
        inputValue,
        content: `Add "${inputValue}"`,
      });
    };

    return filtered;
  };

  const autocompleteGetOptionsLabel = (option) => {
    // Value selected with enter, right from the input
    if (typeof option === 'string') {
      return option;
    }
    // Add "xxx" option created dynamically
    if (option.inputValue) {
      return option.inputValue;
    }
    // Regular option
    return option.content;
  };

  const autocompleteRenderOption = (props, option) => (
    <ListItem {...props} key={option.content}>
      <ListItemText primary={option.content} />
      <ListItemSecondaryAction>
        {option.content !== 'None' &&
          <IconButton
            edge="end"
            aria-label="delete"
            //onClick={(e) => handleOptionDelete(option)} TODO
          >
            <DeleteIcon />
          </IconButton>
        }
      </ListItemSecondaryAction>
    </ListItem>
  );
  
  
  return (
    <StyledAutocomplete
      color="secondary"
      sx={{ width: 200, m: 1, color: '#ba68c8'}}
      value={value}
      onChange={onAutcompleteChange}
      filterOptions={autocompleteFilterOptions}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id={specifics}
      options={setOptions()}
      getOptionLabel={autocompleteGetOptionsLabel}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={autocompleteRenderOption}
      renderInput={(params) => (
      <TextField {...params} 
        label={specifics}
        color="secondary"
        size='small'
        sx={{
          borderColor: '#ba68c8',
          padding: 0
        }}
      />
      )}
    />
  );
};

export default FilterBarAutocomplete;