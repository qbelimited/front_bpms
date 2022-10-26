import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

function CmButtons({value, onChange, label}) {
  return (
    <div>
        <label className=' block mb-2'>{label}</label>
        <FormControl className=' w-full rounded-md' variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            value={value}
            onChange={onChange}
            endAdornment={<InputAdornment position="end">Cm</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            
          />
        </FormControl>
    </div>
  )
}

export default CmButtons