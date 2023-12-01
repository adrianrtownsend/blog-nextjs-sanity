import 'react-datepicker/dist/react-datepicker.css'

import DatePicker from 'react-datepicker'

const DateTimePicker = (field) => {
  return (
    <DatePicker
      selected={field.value ? new Date(field.value) : null}
      onChange={(date) => field.onChange(date)}
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
    />
  )
}

export default DateTimePicker
