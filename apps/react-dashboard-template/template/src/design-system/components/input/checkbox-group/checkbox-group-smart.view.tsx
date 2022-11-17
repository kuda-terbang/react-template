import React from 'react';
import CheckboxGroup from './checkbox-group.view';
import { useController } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

type Props = Omit<React.ComponentProps<typeof CheckboxGroup>, 'onChange'> & {
  name: string;
  methods?: UseFormReturn;
};

const CheckboxGroupSmartView = ({ methods, name, value, ...otherProps }: Props) => {
  const {
    field: { onChange, value: fieldValue },
  } = useController({
    name,
    control: methods?.control,
    defaultValue: value,
  });
  const handleChange = (nameValue: string, newValue: boolean) => {
    onChange({
      ...fieldValue,
      [nameValue]: newValue,
    });
  };
  return <CheckboxGroup {...otherProps} onChange={handleChange} value={fieldValue} />;
};

export default CheckboxGroupSmartView;
