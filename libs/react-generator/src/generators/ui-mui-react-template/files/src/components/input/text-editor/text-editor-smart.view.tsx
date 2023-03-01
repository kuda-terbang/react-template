import React from 'react'
import TextEditor from './text-editor.view'
import { useController } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'

type Props = Omit<React.ComponentProps<typeof TextEditor>, 'onChange'> & {
	name: string,
	methods?: UseFormReturn
}

const TextEditorSmartView = ({ methods, name, value, ...otherProps }: Props) => {
	const {
    field: { onChange, value: fieldValue },
  } = useController({
    name,
    control: methods?.control,
		defaultValue: value || '',
  });
	return <TextEditor {...otherProps} onChange={onChange} value={fieldValue} />
}

export default TextEditorSmartView
