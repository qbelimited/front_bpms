import React from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';

function Textarea({label, value, onChange, place}) {
  return (
    <div>
        <label className=' mb-2 block'>{label}</label>
        <TextareaAutosize
        className=' w-full bg-gray-50 border border-gray-200 rounded-md p-2'
      aria-label="minimum height"
      minRows={4}
      value={value}
      onChange={(e) =>onChange(e.target.value)}
      placeholder={place}
      
    />
    </div>
  )
}

export default Textarea