/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import type { TextFieldProps } from '@mui/material/TextField';
import type { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason } from '@mui/material/Autocomplete';

type AutocompleteViewProps<TOption = { label: string, value: string | number }> = {
  type?: 'fetch' | 'static'
  label: string
  getOptionLabel?: (option: TOption) => string
  onInputChange?: ((
    event: React.SyntheticEvent<Element, Event>,
    value: string | number,
    reason: AutocompleteInputChangeReason) => void
  ) | undefined
  onChangeValue: (
    event: React.SyntheticEvent<Element, Event>,
    value: TOption | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<TOption> | undefined
  ) => void
  options?: TOption[]
  fetchOptions?: {
    debounceTime?: number
    fetchFunction: (str: string) => Promise<TOption[]>
  }
  textFieldProps?: TextFieldProps
  value?: TOption | null
}

function AutocompleteView<TOption extends { label: string, value: string | number }>({
  type = 'static',
  getOptionLabel,
  label,
  onInputChange,
  onChangeValue,
  options,
  fetchOptions,
  textFieldProps,
  value,
}: AutocompleteViewProps<TOption>) {
  const [showedOptions, setshowedOptions] = useState(options || [])
  const [inputState, setinputState] = useState<string|null>()

  useEffect(() => {
    let timeoutFunc: NodeJS.Timeout
    if (type === 'fetch' && !!fetchOptions) {
      const fetchFunction = async () => {
        const data = await fetchOptions.fetchFunction(inputState || '')
        setshowedOptions(data)
      }
      timeoutFunc = setTimeout(() => {
        fetchFunction()
      }, fetchOptions?.debounceTime || 1000)
    }
    return () => {
      if (timeoutFunc) {
        clearTimeout(timeoutFunc)
      }
    }
  }, [inputState])

  return (
    <Autocomplete
      id={`autocomplete-${label}`}
      options={showedOptions}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={getOptionLabel}
      onInputChange={(...props) => {
        const [, value] = props
        setinputState(value)
        onInputChange?.(...props)
      }}
      value={value}
      onChange={(...props) => {
        onChangeValue(...props)
      }}
      renderInput={(params) => <TextField {...params} {...textFieldProps} label={label} />}
    />
  );
}

export default AutocompleteView
