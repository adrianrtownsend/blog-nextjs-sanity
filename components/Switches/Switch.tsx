import { Switch } from '@headlessui/react'
import { useState } from 'react'
const BasicSwitch = ({
  isEnabled = false,
  label = '',
  handleSwitch,
  disabled = false,
}) => {
  return (
    <Switch.Group>
      <Switch.Label className="mr-4">{label}</Switch.Label>
      <Switch
        checked={isEnabled}
        onChange={handleSwitch}
        className={`${
          isEnabled ? 'bg-emerald-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
        disabled={disabled}
      >
        <span
          className={`${
            isEnabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </Switch.Group>
  )
}
export default BasicSwitch
