import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

type CheckboxProps = React.ComponentProps<typeof Checkbox>
type FormProps = React.ComponentProps<typeof FormControl>
type FormGroupProps = React.ComponentProps<typeof FormGroup>
type CheckBoxGroupProps = {
  data: {
    label: string
    value: CheckboxProps['value']
    disabled?: boolean
    default?: boolean
    checkboxProps?: CheckboxProps
  }[]
  formProps?: FormProps
  formGroupProps?: FormGroupProps
  label: string
  onChange: FormGroupProps['onChange']
}

const CheckBoxGroupView = ({ data, formProps, label, onChange }: CheckBoxGroupProps) => {
  return (
    <FormControl {...formProps} variant="standard">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup onChange={onChange}>
        {data.map((item) => (
          <FormControlLabel
            key={`${item.label}${item.value}`}
            value={item.value}
            disabled={item.disabled}
            control={<Checkbox {...item.checkboxProps} defaultChecked={item.default} />}
            label={item.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  )
}

export default CheckBoxGroupView
