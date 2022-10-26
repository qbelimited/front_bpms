import React from 'react'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
function AppContent() {
  return (
    <div className=' mt-10'>
        <div className=' p-6 bg-gray-100 border border-gray-200 rounded-md'>
            <div className=' flex justify-between'>
                <div className=''>
                    <span className=' p-2 rounded-xl bg-gray-300'><DarkModeRoundedIcon /></span>
                    <h6 className='ml-3 inline'>Toggle dark mode</h6>
                </div>
                <ToggleOnOutlinedIcon />
            </div>
            <p className=' mt-3 text-gray-400'>Switching to dark mode gives your application a modern dark theme. Use the toggle to switch back to light mode</p>
        </div>
        <div className=' mt-10 p-6 bg-gray-100 border border-gray-200 rounded-md'>
        <div className=' flex justify-between'>
                <div className=''>
                    <span className=' p-2 rounded-xl bg-gray-300'><DarkModeRoundedIcon /></span>
                    <h6 className='ml-3 inline'>Email notifications</h6>
                </div>
                <ToggleOnOutlinedIcon />
            </div>
            <p className=' mt-3 text-gray-400'>Switching to dark mode gives your application a modern dark theme. Use the toggle to switch back to light mode</p>
            <div className=' mt-8'>
            
            <FormControl>
      <FormLabel id="demo-radio-buttons-group-label" className=' mt-3 text-gray-400'>Email conditions</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="1"
        name="radio-buttons-group"
      >
        <FormControlLabel value="1" control={<Radio color="default" size="small"/>} label="Email condition 1" />
        <FormControlLabel value="2" control={<Radio color="default" size="small"/>} label="Email condition 2" />
        <FormControlLabel value="3" control={<Radio color="default" size="small"/>} label="Email condition 3" />
      </RadioGroup>
    </FormControl>
            </div>
        </div>
    </div>
  )
}

export default AppContent