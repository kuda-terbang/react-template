import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

type CheckboxProps = React.ComponentProps<typeof Checkbox>;
type FormProps = React.ComponentProps<typeof FormControl>;
type FormGroupProps = React.ComponentProps<typeof FormGroup>;
type CheckBoxGroupProps = {
  data: {
    key: string;
    label: string;
    value: CheckboxProps['value'];
    disabled?: boolean;
    default?: boolean;
    checkboxProps?: CheckboxProps;
  }[];
  formProps?: FormProps;
  formGroupProps?: FormGroupProps;
  label: string;
  onChange: (
    name: string,
    value: boolean,
    event: React.FormEvent<HTMLDivElement>
  ) => void;
  value: Record<string, boolean>;
};

const CheckBoxGroupView = ({
  data,
  formProps,
  label,
  onChange,
  value,
}: CheckBoxGroupProps) => {
  return (
    <FormControl {...formProps} variant="standard">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup
        onChange={(event) => {
          const target = event.target as HTMLInputElement;
          onChange(target.name, Boolean(target.value), event);
        }}
      >
        {data.map((item) => {
          return (
            <FormControlLabel
              key={`${item.label}${item.value}`}
              disabled={item.disabled}
              value={value[item.key]}
              checked={value[item.key]}
              control={<Checkbox {...item.checkboxProps} name={item.key} />}
              label={item.label}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

export default CheckBoxGroupView;
