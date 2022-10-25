import React, {useState} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel'
import FilterIcon from '../images/filter.png'
function Filter() {

    const [open, setOpen] = useState(false)
    const handleClick = (() => setOpen(!open))
  return (
    <div className=' flex justify-center'>
    <div>
        <button onClick={handleClick} className=' p-4 border border-gray-300 rounded-md '>
            <img src={FilterIcon} alt='filter' className={open ?'rotate-180 inline':' inline'}/> <span className=' pl-3'>Filters</span>
        </button>
        {open && <div>
            <div className=' mt-2 mb-4'>
            <FormControl>
     
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                <div className=' flex justify-between'>
                <div ><FormControlLabel value="small" control={<Radio color="secondary"/>} label="Small   " /></div>
                    <div className=' flex flex-col justify-center'>
                    <p className=' '>(sm) </p>
                    </div>
              
                </div>
                <div className=' flex justify-between'>
                <div >  <FormControlLabel value="medium" control={<Radio color="secondary"/>} label="Medium " /></div>
                    <div className=' flex flex-col justify-center'>
                    <p className=' '> (md) </p>
                    </div>
              
                </div>
                <div className=' flex justify-between'>
                <div > <FormControlLabel value="large" control={<Radio color="secondary"/>} label="Large " /></div>
                    <div className=' flex flex-col justify-center'>
                    <p className=' '>(lg) </p>
                    </div>
              
                </div>
                    
                  
                   
                </RadioGroup>
                </FormControl>
            </div>
            <div className=' mt-2 mb-4'>
            <FormControl>
     
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                <div className=' flex justify-between'>
                <div ><FormControlLabel value="red" control={<Radio color="secondary" />}  label="Red  " /></div>
                    <div className=' flex flex-col justify-center'>
                    <p className=' rounded-full h-6 w-6 bg-orange-400'> </p>
                    </div>
              
                </div>
                <div className=' flex justify-between'>
                <div ><FormControlLabel value="green" control={<Radio color="secondary" />}  label="Green  " /></div>
                    <div className=' flex flex-col justify-center'>
                    <p className=' rounded-full h-6 w-6 bg-green-500'> </p>
                    </div>
              
                </div>
                <div className=' flex justify-between'>
                <div >  <FormControlLabel value="blue" control={<Radio color="secondary" />}  label="Purple " /></div>
                    <div className=' flex flex-col justify-center'>
                    <p className=' rounded-full h-6 w-6 bg-blue-600'> </p>
                    </div>
              
                </div>
                    
                  
                </RadioGroup>
                </FormControl>
            </div>
        </div>}
        </div>
    </div>
  )
}

export default Filter