import React from 'react';
import Password from './password.view';
import { useController } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

type Props = Omit<React.ComponentProps<typeof Password>, 'onChange'> & {
  name: string;
  methods?: UseFormReturn;
};

const PasswordSmartView = ({ methods, name, value, ...otherProps }: Props) => {
  const {
    field: { onChange, value: fieldValue },
  } = useController({
    name,
    control: methods?.control,
    defaultValue: value || '',
  });
  return <Password {...otherProps} onChange={onChange} value={fieldValue} />;
};

export default PasswordSmartView;
