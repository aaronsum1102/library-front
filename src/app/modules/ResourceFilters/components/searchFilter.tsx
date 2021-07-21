import React from 'react';
import { Box, TextField, IconButton, styled } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  onClearSearch: () => void;
}

const StyledTextField = styled(TextField)({
  width: '100%',

  '& input': {
    paddingRight: '32px'
  }
});

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  right: '0px',
  bottom: '0px',
  padding: '6px'
});

const SearchFilter = ({ value, onChange, onClearSearch }: SearchFilterProps): JSX.Element => {
  return (
    <Box width="200px" position="relative">
      <StyledTextField
        id="resource-filter"
        label="Search resource"
        inputProps={{ 'aria-label': 'resource-filter' }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {value && (
        <StyledIconButton
          color="default"
          aria-label="clear-resource-filter"
          onClick={() => onClearSearch()}
        >
          <CloseIcon fontSize="small" />
        </StyledIconButton>
      )}
    </Box>
  );
};

export default SearchFilter;
