import React, { useCallback, ChangeEvent, useMemo } from 'react';
import { FormControl, InputLabel, Select, MenuItem, styled } from '@material-ui/core';

import { isEqual } from '../helpers';

const StyledFormControl = styled(FormControl)({
  width: '100%'
});

export interface DropdownOption<T> {
  label: string;
  value: T;
}

export interface DropdownProps<T> {
  id: string;
  label: string;
  value: T;
  options: DropdownOption<T>[];
  minWidth?: string;
  onChange: (value: T, name?: string) => void;
}

export const Dropdown = <T,>({
  id,
  label,
  value,
  options,
  minWidth,
  onChange
}: DropdownProps<T>): JSX.Element => {
  const currentValue = useMemo(() => {
    if (typeof value === 'object' && value) {
      return options.findIndex(
        (option) =>
          typeof option.value === 'object' &&
          isEqual(option.value as Record<string, unknown>, value as Record<string, unknown>)
      );
    }

    return options.findIndex((option) => option.value === value);
  }, [value, options]);

  const handleChange = useCallback(
    (
      e: ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>
    ) => {
      const { value: targetValue, name } = e.target;
      const data = options[targetValue as number].value;

      onChange(data, name);
    },
    [onChange]
  );

  return (
    <StyledFormControl style={{ minWidth: minWidth || '120px' }}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select labelId={`${id}-label`} id={id} value={currentValue} onChange={handleChange}>
        {options.map((option, index) => (
          <MenuItem key={option.label} aria-label={option.label} value={index}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};
