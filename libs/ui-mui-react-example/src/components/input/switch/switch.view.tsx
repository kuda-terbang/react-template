import React, { ChangeEvent } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';

type FormProps = React.ComponentProps<typeof FormControl>;
type SwitchProps = React.ComponentProps<typeof Switch>;

type SwitchViewProps = {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  switchProps?: Omit<SwitchProps, 'checked' | 'onChange' | 'name'>;
  formProps?: Omit<FormProps, 'commponent' | 'variant'>;
  data: {
    key: string;
    label: string;
  }[];
  value: Record<string, boolean>;
};

function SwitchView({ label, data, onChange, switchProps, formProps, value }: SwitchViewProps) {
  return (
    <FormControl {...formProps} variant="standard">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {data.map((item) => (
          <FormControlLabel
            key={item.key}
            control={
              <Switch
                {...switchProps}
                checked={value[item.key]}
                onChange={onChange}
                name={item.key}
              />
            }
            label={item.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default SwitchView;
