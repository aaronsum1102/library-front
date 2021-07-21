import React, { useCallback, ChangeEvent } from 'react';
import { FormControl, InputLabel, Select, MenuItem, styled } from '@material-ui/core';

export interface DropdownProps {
  id: string;
  label: string;
  value: string;
  options: { label: string; value: string | number }[];
  onChange: (value: unknown, name?: string) => void;
}

const StyledFormControl = styled(FormControl)({
  minWidth: '120px'
});

export const Dropdown = ({ id, label, value, options, onChange }: DropdownProps): JSX.Element => {
  const handleChange = useCallback(
    (
      e: ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>
    ) => {
      const { value: targetValue, name } = e.target;

      onChange(targetValue, name);
    },
    [onChange]
  );

  return (
    <StyledFormControl>
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
