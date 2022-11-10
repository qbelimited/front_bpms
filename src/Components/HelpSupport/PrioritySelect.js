
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function PrioritySelect({bool, value, onChange}) {
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
               
                    <MenuItem  value='1'>Important</MenuItem>
                    <MenuItem  value='0'>Less Important</MenuItem>
                </Select>
                </FormControl>
            </div>
  )
}

export default PrioritySelect