import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateRecordFormState} from '../features/muiComponents/muiComponentsSlice';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

function RecordFormAutocomplete({parentToChild}) {
  const filter = createFilterOptions();
  const {specifics, required} = parentToChild;
  const {recordFormState} = useSelector((state) => state.muiComponents);
  const specificValue = specifics === 'Concept' ? 'concept' : 'category';
  const value = recordFormState[specificValue];
  const dispatch = useDispatch();

  const onAutcompleteChange = (event, newValue) => {
    if (newValue === null) newValue = {content: ''};
    let newState = recordFormState

    if (typeof newValue === 'string') {
      newState = {
        ...newState,
        [specificValue]: {content : newValue}
      };
    } else if (newValue && newValue.inputValue) {
      newState = {
        ...newState,
        [specificValue]: newValue.inputValue
      };
    } else {
      newState = {
        ...newState,
        [specificValue]: newValue.content
      };
    };

    dispatch(updateRecordFormState(newState));
  };

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
  ];

  const categories = [
    {content: 'Food'},
    {content: 'Gym'},
    {content: 'Office'},
    {content: 'Personal'},
    {content: 'Presents'},
  ];

  const setOptions = () => {
    switch (specifics) {
      case 'Concept': return concepts;
      case 'Category': return categories;
      //no default
    };
  };

  const autocompleteFilterOptions = (options, params) => {
    const filtered = filter(options, params);
    const {inputValue} = params;

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
        <IconButton
          edge="end"
          aria-label="delete"
          //onClick={(e) => handleOptionDelete(option)} TODO
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );  
  
  return (
    <Autocomplete
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
      <TextField 
        {...params}
        required={required}
        margin="normal"
        label={specifics}
      />
      )}
    />
  );
};

export default RecordFormAutocomplete;