import React, {useEffect, useState} from 'react'

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import getServices from '../../Services/get-services';
function SelectPlate({value, onChange, bool}) {
    const [plate, setPlate] = useState([])
    useEffect(()=>{
        getServices.getAllPlates().then(
            (response) => {
                
              setPlate(response.data['all number plates']);
              
              console.log(response.data['all number plates'])
              
            },
            (error) => {
              const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
      
                setPlate(_content);
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
        {plate.map((i) =>(
            <MenuItem key={i.id} value={i.id}>{i.number_plate}</MenuItem>
        ))}
        
        </Select>
        </FormControl>
    </div>
  )
}

export default SelectPlate