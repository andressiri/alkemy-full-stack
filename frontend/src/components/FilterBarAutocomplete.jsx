import React, {useState} from 'react';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function CategoryAutocomplete({parentToChild}) {
  const [value, setValue] = useState(null);
  const filter = createFilterOptions();
  const {specifics} = parentToChild;

  const StyledAutocomplete = styled(Autocomplete)({
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      // Default transform is "translate(14px, 20px) scale(1)""
      // This lines up the label with the initial cursor position in the input
      // after changing its padding-left.
      //transform: "translate(34px, 20px) scale(1);"
      opacity: 0.6,
      color: "#ba68c8",
    },
    "& .MuiInputLabel-shrink": {
      color: "#ba68c8",
    },
    "& .MuiSvgIcon-root": {
      color: "#ba68c8",
      margin: -3
    },
    '& .css-1wnwmuc-MuiInputBase-root-MuiOutlinedInput-root': {
      paddingRight: "45px !important"
    },
    "& .MuiAutocomplete-inputRoot": {
      color: "#9c27b0",
      // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
      '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
        // Default left padding is 6px
        paddingTop: '3px',
        paddingLeft: '5px',
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ba68c8"
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#9c27b0"
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
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
    };
  };

  const onAutcompleteChange = (event, newValue) => {
    if (typeof newValue === 'string') {
      setValue({
        content: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      setValue({
        content: newValue.inputValue,
      });
    } else {
      setValue(newValue);
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

export default CategoryAutocomplete;