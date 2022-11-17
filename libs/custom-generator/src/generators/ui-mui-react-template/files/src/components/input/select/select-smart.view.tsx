import React from 'react'
import Select from './select.view'
import { useController } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'

type Props = Omit<React.ComponentProps<typeof Select>, 'value' | 'onChange'> & {
	value?: any,
	name: string,
	methods?: UseFormReturn
}

const RadioGroupSmartView = ({ methods, name, value, ...otherProps }: Props) => {
	const {
    field: { onChange, value: fieldValue },
  } = useController({
    name,
    control: methods?.control,
		defaultValue: value || '',
  });
	return <Select {...otherProps} onChange={onChange} value={fieldValue} />
}

export default RadioGroupSmartView
