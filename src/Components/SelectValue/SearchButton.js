import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function SearchButton({value, onChange, label}) {
  return (
    <div>
        <FormControl className=' w-full' variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            value={value}
            placeholder={label}
            onChange={(e) =>onChange(e.target.value)}
            endAdornment={<InputAdornment position="end">
                <SearchOutlinedIcon />
            </InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
         
        </FormControl>
    </div>
  )
}

export default SearchButton