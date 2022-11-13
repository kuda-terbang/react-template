import React from 'react'
import {
	CheckboxGroupSmart,
	DateTimeSmart,
	FormSmart,
	RadioGroupSmart,
	SwitchSmart,
	TextFieldSmart
} from '@kudaterbang/ui-mui-react-example'

type TypeForm = {
	textFieldSmart: string
	checkboxGroupSmart: {
		first: boolean
		second: boolean
		third: boolean
	}
	switchSmart: {
		first: boolean
		second: boolean
	}
	dateDesktop: string
	dateMobile: string
	datetime: string
	time: string
	radioGroupSmart: string
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
const dataSwitch = [
  {
    key: 'first',
    label: 'First',
  },
  {
    key: 'second',
    label: 'Second',
  },
];
const options = [
  {
    label: 'First',
    value: 'first',
  },
  {
    label: 'Second',
    value: 'second',
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
			<SwitchSmart
				name="switchSmart"
				label="Switch Smart"
				data={dataSwitch}
				value={{
					first: false,
					second: true,
				}}
			/>
			<DateTimeSmart
				name="dateDesktop"
				type="date-desktop"
				label="Date Desktop"
			/>
			<DateTimeSmart
				name="dateMobile"
				type="date-mobile"
				label="Date Mobile"
			/>
			<DateTimeSmart
				name="datetime"
				type="datetime"
				label="Datetime"
			/>
			<DateTimeSmart
				name="time"
				type="time"
				label="Time"
			/>
			<RadioGroupSmart
				name="radioGroupSmart"
				label="Radio Group"
				options={options}
				value={options[0].value}
			/>
		</FormSmart>
	)
}

export default SmartInputView
