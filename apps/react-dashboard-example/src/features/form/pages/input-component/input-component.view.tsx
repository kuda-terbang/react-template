import { useState } from 'react'
import { CheckBoxGroup, DateTime, Switch, RadioGroup, Password } from '@kudaterbang/ui-mui-react-example';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs'

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
  return (
    <div>
      <Stack spacing={3}>
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
          options={[
            {
              label: 'First',
              value: 'first',
            },
            {
              label: 'Second',
              value: 'second',
            },
          ]}
        />
        <Password label="Password" value={passwordState} onChange={(e) => setPasswordState(e.target.value)} />
      </Stack>
    </div>
  )
}

export default InputComponentView
