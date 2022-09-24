import React from 'react'
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import styled from 'styled-components';
import { humanFileSize } from '../../../utils/textFormatter';
import { FormControl, FormLabel, OutlinedInput } from '@mui/material';

const InputHidden = styled.input`
  display: none;
`
type Props = {
  label: string
  onClickRemove?: React.MouseEventHandler<HTMLButtonElement>
  onChange: (file: File | null, event?: React.ChangeEvent<HTMLInputElement>) => void
  value: File | null
}

const InputFile = ({
  label,
  onClickRemove,
  onChange,
  value,
}: Props) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const textValue = value ? `${value.name} (${humanFileSize(value.size)})` : ''
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.files?.[0] || null, e)
  }
  const handleOpenFileBrowser: React.MouseEventHandler<HTMLButtonElement|HTMLDivElement> = (e) => {
    console.log('clicked')
    e.preventDefault()
    fileInputRef.current?.click()
  }
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <OutlinedInput
        readOnly
        endAdornment={(!!onClickRemove && !!value) && (
          <InputAdornment position="end">
            <IconButton onClick={(e) => onClickRemove(e)} size="small">
              <CloseIcon fontSize='medium' />
            </IconButton>
          </InputAdornment>
        )}
        startAdornment={(
          <InputAdornment position="start">
            <Button
              onClick={handleOpenFileBrowser}
              color="primary"
              size="small"
            >
              Select file
            </Button>
          </InputAdornment>
        )}
        value={textValue}
      />
      <InputHidden
        ref={fileInputRef}
        onChange={handleChange}
        type="file"
      />
    </FormControl>
  )
}

export default InputFile
