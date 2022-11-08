import React, {useState,useEffect} from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import getServices from '../../Services/get-services';

function WarehouseSelect({bool,items, value, onChange}) {
    const [warehouses,  setWareHouses] = useState([])
    useEffect(() =>{
        getServices.getAllWarehouse().then(
          (response) => {
            setWareHouses(response.data['all warehouses']);
            console.log(response.data['all warehouses'])
            
          },
          (error) => {
            const _content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
    
              setWareHouses(_content);
          }
        )
  }, [])
  return (
    <div className={bool ? 'w-full' :' w-32'}>
            <FormControl fullWidth size={!bool &&"small"}>
            {warehouses.map((i, index) =>(
                <InputLabel key={i.id} id="demo-simple-select-label">{index === 0 ? i.name : null}</InputLabel>
                ))}
            
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                
                onChange={(e) =>onChange(e.target.value)}
                >
                {warehouses.map((i) =>(
                    <MenuItem key={i} value={i.id}>{i.name}</MenuItem>
                ))}
                
                </Select>
                </FormControl>
            </div>
  )
}

export default WarehouseSelect