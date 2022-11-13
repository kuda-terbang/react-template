import React from 'react'
import { FormSmart, TextFieldSmart } from '@kudaterbang/ui-mui-react-example'

type TypeForm = {
	textFieldSmart: string
}

const SmartInputView = () => {
	return (
		<FormSmart<TypeForm> onSubmit={(data) => {
			console.log('submit data', data)
		}}>
			<TextFieldSmart name="textFieldSmart" label="Text Field Smart" />
		</FormSmart>
	)
}

export default SmartInputView
