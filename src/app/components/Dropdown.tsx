import React, { useCallback, ChangeEvent } from 'react';
import { FormControl, InputLabel, Select, MenuItem, styled } from '@material-ui/core';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: 'fit-content',
  marginTop: '0.5rem',
  marginBottom: '0.5rem',

  [theme.breakpoints.up('sm')]: {
    marginTop: '1rem',
    marginBottom: '1rem'
  }
}));

export interface DropdownProps {
  id: string;
  label: string;
  value: string;
  options: { label: string; value: string | number }[];
  minWidth?: string;
  onChange: (value: string | number, name?: string) => void;
}

export const Dropdown = ({
  id,
  label,
  value,
  options,
  minWidth,
  onChange
}: DropdownProps): JSX.Element => {
  const handleChange = useCallback(
    (
      e: ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>
    ) => {
      const { value: targetValue, name } = e.target;

      if (typeof targetValue === 'string') {
        onChange(targetValue as string, name);
      } else {
        onChange(targetValue as number, name);
      }
    },
    [onChange]
  );

  return (
    <StyledFormControl style={{ minWidth: minWidth || '120px' }}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select labelId={`${id}-label`} id={id} value={value} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option.label} aria-label={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};
