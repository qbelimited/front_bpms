import React, {useEffect, useState} from 'react'

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import getServices from '../../Services/get-services';

function SelectCompany({bool, value, onChange}) {
    const [company, setCompany] = useState([])
    useEffect(()=>{
        getServices.getAllCompany().then(
            (response) => {
                
              setCompany(response.data['companies']);
              
              console.log(response.data['companies'])
              
            },
            (error) => {
              const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
      
                setCompany(_content);
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
        {company.map((i) =>(
          i.status === '1' &&  <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>
        ))}
        
        </Select>
        </FormControl>
    </div>
  )
}

export default SelectCompany