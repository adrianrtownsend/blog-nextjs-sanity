import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import * as React from 'react'

const todayAtNoon = dayjs().set('hour', 12).startOf('hour')
const todayAt3PM = dayjs().set('hour', 15).startOf('hour')

export default function DateTimeValidationMinDateTime() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DemoItem label="DateTimePicker">
          <DateTimePicker defaultValue={todayAtNoon} minDateTime={todayAt3PM} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  )
}
