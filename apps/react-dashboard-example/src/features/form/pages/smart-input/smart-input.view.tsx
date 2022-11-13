import React from 'react'
import { CheckboxGroupSmart, FormSmart, TextFieldSmart } from '@kudaterbang/ui-mui-react-example'

type TypeForm = {
	textFieldSmart: string
}

const dataCheckbox = [
  {
    key: 'first',
    label: 'Satu',
    value: 1,
  },
  {
    key: 'second',
    label: 'Dua',
    value: 2,
    disabled: true,
  },
  {
    key: 'third',
    label: 'Tiga',
    value: 3,
  },
];

const SmartInputView = () => {
	return (
		<FormSmart<TypeForm> onSubmit={(data) => {
			console.log('submit data', data)
		}}>
			<TextFieldSmart name="textFieldSmart" label="Text Field Smart" />
			<CheckboxGroupSmart
				name="checkboxGroupSmart"
				label="Check Box Group Smart"
				data={dataCheckbox}
				value={{
					first: false,
					second: true,
					third: true,
				}}
			/>
		</FormSmart>
	)
}

export default SmartInputView
