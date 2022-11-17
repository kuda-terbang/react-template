/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import dayjs from 'dayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type Props = {
  label: string;
  type?: 'time' | 'date-desktop' | 'date-mobile' | 'datetime';
  onChange: (value: any, keyboardInputValue?: string | undefined) => void;
  inputFormat?: string;
  textFieldProps?: TextFieldProps;
  value: any;
};

const DateTimeView = ({
  textFieldProps,
  label,
  type = 'date-desktop',
  onChange,
  inputFormat = 'MM/DD/YYYY',
  value,
}: Props) => {
	const handleChange = (value: any, keyboardInputValue?: string | undefined) => {
		const valueString = dayjs(value).toISOString()
		onChange(valueString, keyboardInputValue)
	}
  const renderTextField = (params: TextFieldProps) => <TextField {...textFieldProps} {...params} />;
  if (type === 'time') {
    return (
      <TimePicker label={label} value={value} onChange={handleChange} renderInput={renderTextField} />
    );
  }
  if (type === 'date-desktop') {
    return (
      <DesktopDatePicker
        label={label}
        inputFormat={inputFormat}
        value={value}
        onChange={handleChange}
        renderInput={renderTextField}
      />
    );
  }
  if (type === 'date-mobile') {
    return (
      <MobileDatePicker
        label={label}
        inputFormat={inputFormat}
        value={value}
        onChange={handleChange}
        renderInput={renderTextField}
      />
    );
  }
  return (
    <DateTimePicker label={label} value={value} onChange={handleChange} renderInput={renderTextField} />
  );
};

export default DateTimeView;
