import React from 'react'
import TextField from '@mui/material/TextField'
import type { UseFormReturn } from 'react-hook-form'
import type { TextFieldProps } from '@mui/material/TextField'

type Props = Omit<TextFieldProps, 'variant'> & {
	name: string,
	methods?: UseFormReturn
}

const TextFieldSmartView = ({ name, methods, ...otherProps }: Props) => {
	return (
		<TextField {...otherProps} {...methods?.register(name)} />
	)
}

export default TextFieldSmartView
