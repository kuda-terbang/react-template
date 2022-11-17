import React from 'react'
import { useController } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'

import DateTime from './datetime.view'

type Props = Omit<React.ComponentProps<typeof DateTime>, 'value' | 'onChange'> & {
	value?: string
	name: string,
	methods?: UseFormReturn
}

const DateTimeSmartView = ({ methods, name, value, ...otherProps }: Props) => {
	const {
    field: { onChange, value: fieldValue },
  } = useController({
    name,
    control: methods?.control,
		defaultValue: value,
  });
	return <DateTime {...otherProps} onChange={onChange} value={fieldValue} />
}

export default DateTimeSmartView
