import React from 'react'
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import type { MuiTelInputProps, MuiTelInputInfo } from 'mui-tel-input'

type PhoneProps = Omit<MuiTelInputProps, 'onChange' | 'defaultCountry'> & {
  onChange: (value: string, info: MuiTelInputInfo, isValid: boolean) => void
}

const Phone = ({onChange, ...otherProps}: PhoneProps) => {
  const handleChange: MuiTelInputProps['onChange'] = (value, info) => {
    onChange?.(value, info, matchIsValidTel(value))
  }
  return (
    <MuiTelInput {...otherProps} defaultCountry="ID" onChange={handleChange} />
  )
}
export default Phone
