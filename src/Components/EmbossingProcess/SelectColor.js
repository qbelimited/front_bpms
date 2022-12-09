import React, {useEffect, useState} from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import getServices from '../../Services/get-services';

function SelectColor({value, onChange, bool}) {
    const[colors, setColors] = useState([])

    useEffect(()=>{
        getServices.embossingCollors().then(
            (response) => {
                
              setColors(response.data['embosser colors']);
              
              console.log(response.data['embosser colors'])
              
            },
            (error) => {
              const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
      
                setColors(_content);
            }
          )
    }, [])

  return (
    <div className={bool ? 'w-full' :' w-32'}>
    <FormControl fullWidth size={!bool &&"small"}>
        
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        placeholder='Select plate'
        onChange={(e) =>onChange(e.target.value)}
        >
        {colors.map((i) =>(
          i.status === '1' &&  <MenuItem key={i.id} value={i.id}>{i.color}</MenuItem>
           
        ))}
        
        </Select>
        </FormControl>
    </div>
  )
}

export default SelectColor