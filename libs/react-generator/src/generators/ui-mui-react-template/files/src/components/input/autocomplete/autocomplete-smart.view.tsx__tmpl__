import React from 'react'
import Autocomplete from './autocomplete.view'
import { useController } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'

type AutocompleteProps = React.ComponentProps<typeof Autocomplete>
type Props = Omit<AutocompleteProps, 'onChangeValue'> & {
	name: string,
	methods?: UseFormReturn
}

const AutocompleteSmartView = ({ methods, name, value, ...otherProps }: Props) => {
	const {
    field: { onChange, value: fieldValue },
  } = useController({
    name,
    control: methods?.control,
  });
	const handleChange: AutocompleteProps['onChangeValue'] = (_event, value) => {
		onChange(value)
	}
	return <Autocomplete {...otherProps} onChangeValue={handleChange} value={fieldValue} />
}

export default AutocompleteSmartView
