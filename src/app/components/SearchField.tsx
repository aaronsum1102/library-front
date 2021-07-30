import React from 'react';
import { Box, TextField, IconButton, styled } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface SearchFieldProps {
  label: string;
  value: string;
  id?: string;
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

const generateIdFromLabel = (value: string): string => {
  return `${value.toLowerCase().replace(' ', '-')}-filter`;
};

const SearchField = ({ label, value, id, onChange }: SearchFieldProps): JSX.Element => {
  const inputId = id || generateIdFromLabel(label);

  return (
    <Container>
      <StyledTextField
        id={inputId}
        label={label}
        inputProps={{ 'aria-label': inputId }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {value && (
        <StyledIconButton
          color="default"
          aria-label={`clear-${inputId}`}
          onClick={() => onChange('')}
        >
          <CloseIcon fontSize="small" />
        </StyledIconButton>
      )}
    </Container>
  );
};

SearchField.defaultProps = {
  id: undefined
};

export default SearchField;
