import React, {useState, useEffect} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import getServices from '../Services/get-services';
import FilterIcon from '../images/filter.png'
function Filter() {
   
    const [open, setOpen] = useState(false)
    const handleClick = (() => setOpen(!open))
    const [color, setColor] = useState([])
    const [size, setSize] = useState([])
    useEffect(() =>{
        getServices.getAllColor().then(
            (response) => {
              setColor(response.data['platecolors']);
              console.log(response.data)
              
            },
            (error) => {
              const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
      
                setColor(_content);
            }
          )
          getServices.getAllPlateDimension().then(
            (response) => {
              setSize(response.data['platedimensions']);
              console.log(response.data)
              
            },
            (error) => {
              const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
      
                setSize(_content);
            }
          )
    }, [])

  return (
    <div className=' flex justify-center ' >
    <div>
        <button onClick={handleClick} className=' p-4 border border-gray-300 rounded-md '>
            <img src={FilterIcon} alt='filter' className={open ?'rotate-180 inline':' inline'}/> <span className=' pl-3'>Filters</span>
        </button>
        {open && <div className='h-[50vh] overflow-y-auto overflow-auto'>
            <div className=' mt-2 mb-4 '>
            <FormControl>
     
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="small"
                    name="radio-buttons-group"
                >
                {size.map(i =>{
                  return   <div className=' flex justify-between'>
                <div ><FormControlLabel value={i.dimensions} control={<Radio color="secondary"/>} label={i.dimensions} /></div>
                    
                </div>
                
                })}
                
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
                {color.map(i =>{
                  return   <div className=' flex justify-between'>
                <div ><FormControlLabel value={i.color} control={<Radio color="secondary"/>} label={i.color} /></div>
                    
                </div>
                
                })}   
                </RadioGroup>
                </FormControl>
            </div>
        </div>}
        </div>
    </div>
  )
}

export default Filter