import React, {useState, useEffect} from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import getServices from '../../Services/get-services';

function SelectCompany({value, onChange, bool}) {
    const [com, setCom] = useState([])

    useEffect(() =>{
        getServices.getAllCompany().then(
            (response) => {
             setCom(response.data['companies']);
              console.log(response.data)
              
            },
            (error) => {
              const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
      
               setCom(_content);
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
                
                onChange={(e) =>onChange(e.target.value)}
                >
                 { com.map((i) =>(
                    <MenuItem key={i.id} value={i.id}>{i.status === '1' && i.name  }</MenuItem>
                ))}
                
                </Select>
                </FormControl>
            </div>
  )
}

export default SelectCompany