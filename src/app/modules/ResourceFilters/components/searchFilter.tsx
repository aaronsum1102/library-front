import React from 'react';
import { Box, TextField, IconButton, styled } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const Container = styled(Box)({
  position: 'relative'
});

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

const SearchFilter = ({ value, onChange }: SearchFilterProps): JSX.Element => {
  return (
    <Container>
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
          onClick={() => onChange('')}
        >
          <CloseIcon fontSize="small" />
        </StyledIconButton>
      )}
    </Container>
  );
};

export default SearchFilter;
