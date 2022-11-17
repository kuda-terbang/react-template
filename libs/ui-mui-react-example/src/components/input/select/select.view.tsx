import React, { useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { SelectProps } from '@mui/material/Select';
import type { FormControlProps } from '@mui/material/FormControl';
import type { MenuItemProps } from '@mui/material/MenuItem';

type SelectViewProps<TValue> = {
  fetchOptions?: {
    fetchFunction: () => Promise<SelectViewProps<TValue>['options']>;
  };
  formProps?: FormControlProps;
  label: string;
  menuItemProps?: Omit<MenuItemProps, 'value' | 'key'>;
  onChange?: SelectProps<TValue>['onChange'];
  options?: {
    [field: string]: unknown;
    label: string;
    value: TValue;
  }[];
  selectProps?: Omit<SelectProps<TValue>, 'labelId' | 'id' | 'value' | 'onChange'>;
  type?: 'fetch' | 'static';
  value?: TValue;
};
export default function SelectView<TValue extends string | number | readonly string[] | undefined>({
  fetchOptions,
  formProps,
  label,
  menuItemProps,
  onChange,
  options,
  selectProps,
  type = 'static',
  value,
}: SelectViewProps<TValue>) {
  const [showedOptions, setshowedOptions] = React.useState(options || []);
  useEffect(() => {
    if (type === 'fetch') {
      const fetchData = async () => {
        const data = await fetchOptions?.fetchFunction();
        setshowedOptions(data || []);
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <FormControl {...formProps}>
      <InputLabel id={`label-${label}`}>{label}</InputLabel>
      <Select
        {...selectProps}
        labelId={`label-${label}`}
        id={`select-${label}`}
        value={value}
        label={label}
        onChange={onChange}
      >
        {showedOptions.map((option) => (
          <MenuItem {...menuItemProps} key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
