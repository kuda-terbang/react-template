import React from 'react';
import Phone from './phone.view';
import { useController } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

type Props = Omit<React.ComponentProps<typeof Phone>, 'onChange'> & {
  name: string;
  methods?: UseFormReturn;
};

const PhoneSmartView = ({ methods, name, value, ...otherProps }: Props) => {
  const {
    field: { onChange, value: fieldValue },
  } = useController({
    name,
    control: methods?.control,
    defaultValue: value || '',
  });
  return <Phone {...otherProps} onChange={onChange} value={fieldValue} />;
};

export default PhoneSmartView;
