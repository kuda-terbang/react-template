import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type PasswordProps = Omit<TextFieldProps, 'type'>

const PasswordView = (props: PasswordProps) => {
  const [isShowPassword, setisShowPassword] = React.useState(false)
  return (
    <TextField
      {...props}
      type={isShowPassword ? 'text' : 'password'}
      InputProps={{
        ...(props.InputProps ? props.InputProps : {}),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setisShowPassword(!isShowPassword)}
              edge="end"
            >
              {isShowPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}

export default PasswordView
