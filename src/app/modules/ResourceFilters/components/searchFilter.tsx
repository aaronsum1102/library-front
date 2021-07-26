import React from 'react';
import { Box, TextField, IconButton, styled } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  onClearSearch: () => void;
}

const Container = styled(Box)(({ theme }) => ({
  minWidth: '150px',
  width: '100%',
  position: 'relative',
  marginTop: '0.5rem',
  marginBottom: '0.5rem',

  [theme.breakpoints.up('sm')]: {
    marginTop: '1rem',
    marginBottom: '1rem',
    width: 'fit-content'
  }
}));

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
          onClick={() => onClearSearch()}
        >
          <CloseIcon fontSize="small" />
        </StyledIconButton>
      )}
    </Container>
  );
};

export default SearchFilter;
