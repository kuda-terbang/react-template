import React from 'react'
import DropFiles from './drop-files.view'
import { useController } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'

type Props = Omit<React.ComponentProps<typeof DropFiles>, 'onChange'> & {
	name: string,
	methods?: UseFormReturn
}

const DropFilesSmartView = ({ methods, name, value, ...otherProps }: Props) => {
	const {
    field: { onChange, value: fieldValue },
  } = useController({
    name,
    control: methods?.control,
		defaultValue: [],
  });
	const handleClickRemove = (index: number) => {
		fieldValue.splice(index, 1)
		onChange(fieldValue)
	}
	return <DropFiles {...otherProps} onChange={onChange} onClickRemove={handleClickRemove} value={fieldValue} />
}

export default DropFilesSmartView
