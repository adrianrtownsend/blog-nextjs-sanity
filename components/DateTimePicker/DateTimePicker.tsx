import 'react-datepicker/dist/react-datepicker.css'

import DatePicker from 'react-datepicker'

const DateTimePicker = (field) => {
  return (
    <DatePicker
      selected={new Date(field.value)}
      onChange={(date) => field.onChange(date)}
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
    />
  )
}

export default DateTimePicker
