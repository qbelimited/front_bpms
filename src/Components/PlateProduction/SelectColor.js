import React, {useState, useEffect} from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import getServices from '../../Services/get-services';

function SelectColor({value, onChange, bool}) {
    const [color, setColor] = useState([])

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
    }, [])
  return (
    <div className={bool ? 'w-full' :' w-32'}>
            <FormControl fullWidth size={!bool &&"small"}>
            
            
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Age"
                onChange={(e) =>onChange(e.target.value)}
                >
                 { color.map((i) =>(
                    <MenuItem key={i.id} value={i.id}>{i.status === '1' && i.color  }</MenuItem>
                ))}
                
                </Select>
                </FormControl>
            </div>
  )
}

export default SelectColor