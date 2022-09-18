import * as React from 'react';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

type RadioGroupProps = {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>, value: string) => void)
  options: {
    label: string
    value: unknown
  }[]
  label: string
  formProps?: FormControlProps
  radioProps?: Omit<RadioProps, 'value'|'control'|'label'>
  value: unknown
}

export default function RadioGroupView({ onChange, value, label, options, formProps, radioProps }: RadioGroupProps) {
  return (
    <FormControl {...formProps}>
      <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={onChange}
      >
        {options.map((item) => (
          <FormControlLabel value={item.value} control={<Radio {...radioProps} />} label={item.label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
