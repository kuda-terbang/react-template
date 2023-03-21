import React from 'react'
import InputFile from './input-file.view'
import { useController } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'

type Props = Omit<React.ComponentProps<typeof InputFile>, 'onChange'> & {
	name: string,
	methods?: UseFormReturn
}

const InputFileSmartView = ({ methods, name, value, ...otherProps }: Props) => {
	const {
    field: { onChange, value: fieldValue },
  } = useController({
    name,
    control: methods?.control,
		defaultValue: null,
  });
	const handleClickRemove = () => {
		onChange(null)
	}
	return <InputFile {...otherProps} onChange={onChange} onClickRemove={handleClickRemove} value={fieldValue} />
}

export default InputFileSmartView
