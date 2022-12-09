import React, {useState, useEffect} from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import getServices from '../../Services/get-services';

function SelectSize({value, onChange, bool}) {
    const [size, setSize] = useState([])

    useEffect(() =>{
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
    <div className={bool ? 'w-full' :' w-32'}>
            <FormControl fullWidth size={!bool &&"small"}>
            
            
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                required
                onChange={(e) =>onChange(e.target.value)}
                >
                 { size.map((i) =>(
                    <MenuItem key={i.id} value={i.id}>{i.status === '1' && i.dimensions  }</MenuItem>
                ))}
                
                </Select>
                </FormControl>
            </div>
  )
}

export default SelectSize