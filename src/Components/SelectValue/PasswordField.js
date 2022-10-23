import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';

import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import React, {useState} from 'react'
function PasswordField({ onChange,label, value }) {
    const [values, setValues] = useState(false)
    
    const handleClickShowPassword = () =>{
        setValues(!values)
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
  return (
    <div>
    <label className=' mb-2 block'> {label}</label>
    <FormControl className=' w-full mt-2 rounded-md border border-gray-300' >
      
      <OutlinedInput
        
        variant="outlined"
        className=' bg-gray-100 p-px'
       
        type={values ? 'text' : 'password'}
        value={value}
        required
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
       />
        </FormControl>
</div>
  )
}

export default PasswordField