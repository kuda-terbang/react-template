import { useState } from 'react'
import {
  CheckBoxGroup,
  DateTime,
  DropFiles,
  InputFile,
  Switch,
  RadioGroup,
  Password,
  Autocomplete,
  Select,
  Phone,
} from '@kudaterbang/ui-mui-react-example';
import type { AcceptedFile } from '@kudaterbang/ui-mui-react-example'
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField';
import apiStrapi from '@kudaterbang/data-access-strapi';

const defaultAutocompleteFetch = {
  label: '',
  value: 0,
}
const defaultAutocompleteStatic = {
  label: '',
  value: '',
}
const InputComponentView = () => {
  const [switchState, setSwitchState] = useState({
    first: false,
    second: true,
  })
  const [dateState, setDateState] = useState(dayjs())
  const [timeState, settimeState] = useState(dayjs())
  const [datetimeState, setdatetimeState] = useState(dayjs())
  const [radioState, setradioState] = useState('')
  const [passwordState, setPasswordState] = useState('')
  const [autocompleteStatic, setautocompleteStatic] = useState<typeof defaultAutocompleteStatic | null>(null)
  const [autocompleteFetch, setautocompleteFetch] = useState<typeof defaultAutocompleteFetch | null>(null)
  const options = [
    {
      label: 'First',
      value: 'first',
    },
    {
      label: 'Second',
      value: 'second',
    },
  ]
  const [selectState, setselectState] = useState('')
  const [selectStateFetch, setselectStateFetch] = useState('')
  const [phoneState, setphoneState] = useState('')
  const [dropfileState, setdropfileState] = useState<AcceptedFile[]>([])
  const [textFieldState, settextFieldState] = useState('')
  const [inputFileState, setinputFileState] = useState<File | null>(null)
  return (
    <div>
      <Stack spacing={3} sx={{padding: 8}}>
        <CheckBoxGroup
          label="Check Box Group"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            console.log('e.target.value', target.value)
          }}
          data={
            [
              {
                label: 'Satu',
                default: true,
                value: 1,
              },
              {
                label: 'Dua',
                value: 2,
                disabled: true,
              },
              {
                label: 'Tiga',
                value: 3,
              },
            ]
          }
        />
        <Switch
          label="Switches"
          onChange={(e) => {
            setSwitchState({
              ...switchState,
              [e.target.name]: e.target.checked,
            })
          }}
          data={[
            {
              key: 'first',
              label: 'First',
              value: switchState.first
            },
            {
              key: 'second',
              label: 'Second',
              value: switchState.second
            },
          ]}
        />
        <DateTime
          type="date-desktop"
          label="Date Desktop"
          value={dateState}
          onChange={(value) => {
            setDateState(value)
          }}
        />
        <DateTime
          type="date-mobile"
          label="Date Mobile"
          value={dateState}
          onChange={(value) => {
            setDateState(value)
          }}
        />
        <DateTime
          type="datetime"
          label="Datetime"
          value={datetimeState}
          onChange={(value) => {
            setdatetimeState(value)
          }}
        />
        <DateTime
          type="time"
          label="Time"
          value={timeState}
          onChange={(value) => {
            settimeState(value)
          }}
        />
        <RadioGroup
          value={radioState}
          onChange={(_e, value) => setradioState(value)}
          label="Radio Group"
          options={options}
        />
        <Password label="Password" value={passwordState} onChange={(e) => setPasswordState(e.target.value)} />
        <Autocomplete
          label="Autocomplete static"
          value={autocompleteStatic}
          onChangeValue={(_e, value) => {
            setautocompleteStatic(value)
          }}
          options={options}
        />
        <Autocomplete
          type="fetch"
          label="Autocomplete fetch"
          value={autocompleteFetch}
          onChangeValue={(_e, value) => {
            setautocompleteFetch(value)
          }}
          fetchOptions={{
            fetchFunction: async (inputText) => {
              const { data } = await apiStrapi.productsGet({
                params: {
                  title: inputText,
                }
              })
              return data?.data.map((item) => ({ label: item.attributes.product_name, value: item.id } )) || []
            },
          }}
        />
        <Select
          label="Select static"
          onChange={(e) => setselectState(e.target.value)}
          options={options}
          value={selectState}
        />
        <Select
          label="Select fetch"
          type="fetch"
          fetchOptions={{
            fetchFunction: async () => {
              const { data } = await apiStrapi.productsGet()
              return data?.data.map((item) => ({ label: item.attributes.product_name, value: String(item.id) } )) || []
            },
          }}
          onChange={(e) => setselectStateFetch(e.target.value)}
          value={selectStateFetch}
        />
        <Phone
          label="Phone Number"
          onChange={(value) => {
            setphoneState(value)
          }}
          value={phoneState}
        />
        <DropFiles
          labelDragActive="Drop files thumbnail"
          labelDragAccept="Files accepted"
          labelDragReject="Files rejected"
          onChangeFile={(file) => {
            setdropfileState([...dropfileState, ...file])
          }}
          onClickSubmit={(files) => {
            console.log('submit files', files)
            setdropfileState([])
          }}
          onClickRemove={(index: number) => {
            const newFiles = [...dropfileState]
            newFiles.splice(index, 1)
            setdropfileState(newFiles)
          }}
          value={dropfileState}
        />
        <DropFiles
          componentType="row"
          labelDragActive="Drop files row"
          labelDragAccept="Files accepted"
          labelDragReject="Files rejected"
          onChangeFile={(file) => {
            setdropfileState([...dropfileState, ...file])
          }}
          onClickSubmit={(files) => {
            console.log('submit files', files)
            setdropfileState([])
          }}
          onClickRemove={(index: number) => {
            const newFiles = [...dropfileState]
            newFiles.splice(index, 1)
            setdropfileState(newFiles)
          }}
          value={dropfileState}
        />
        <TextField
          label="Text Field Custom"
          onChange={(e) => settextFieldState(e.target.value)}
          value={textFieldState}
        />
        <InputFile
          label="Input Single File"
          onChange={(file) => {
            setinputFileState(file)
          }}
          onClickRemove={() => {
            setinputFileState(null)
          }}
          value={inputFileState}
        />
      </Stack>
    </div>
  )
}

export default InputComponentView
