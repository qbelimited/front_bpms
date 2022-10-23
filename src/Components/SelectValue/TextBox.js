import React from 'react'
import { TextField } from '@mui/material'

export default function TextBox({value, onChange, label, type}) {
  return (
    <div>
       <label className=' block mb-2'>{label}</label> 
       <TextField 
       id="outlined-basic"
        variant="outlined"
        value= {value}
        onChange= {onChange}
        type={type}
        className=' w-full bg-gray-100 p-px'
         />
     
    </div>
  )
}
