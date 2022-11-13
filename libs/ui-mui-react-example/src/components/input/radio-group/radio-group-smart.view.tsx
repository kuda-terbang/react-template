import React from 'react'
import RadioGroup from './radio-group.view'
import { useController } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'

type Props = Omit<React.ComponentProps<typeof RadioGroup>, 'onChange'> & {
	name: string,
	methods?: UseFormReturn
}

const RadioGroupSmartView = ({ methods, name, value, ...otherProps }: Props) => {
	const {
    field: { onChange, value: fieldValue },
  } = useController({
    name,
    control: methods?.control,
		defaultValue: value,
  });
	return <RadioGroup {...otherProps} onChange={onChange} value={fieldValue} />
}

export default RadioGroupSmartView
