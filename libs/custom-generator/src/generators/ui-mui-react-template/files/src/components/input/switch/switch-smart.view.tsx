import React from 'react'
import Switch from './switch.view'
import { useController } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'

type Props = Omit<React.ComponentProps<typeof Switch>, 'onChange'> & {
	name: string,
	methods?: UseFormReturn
}

const SwitchSmartView = ({ methods, name, value, ...otherProps }: Props) => {
	const {
    field: { onChange, value: fieldValue },
  } = useController({
    name,
    control: methods?.control,
		defaultValue: value,
  });
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
		onChange({
			...fieldValue,
			[event.target.name]: checked,
		})
	}
	return <Switch {...otherProps} onChange={handleChange} value={fieldValue} />
}

export default SwitchSmartView
