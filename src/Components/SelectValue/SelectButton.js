
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelectButton({value, onChange, items}) {
  return (
    <div className=' w-32'>
            <FormControl fullWidth size="small">
            {items.map((i, index) =>(
                <InputLabel key={i} id="demo-simple-select-label">{index === 0 ? i : null}</InputLabel>
                ))}
            
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Age"
                onChange={onChange}
                >
                {items.map((i) =>(
                    <MenuItem key={i} value={i}>{i}</MenuItem>
                ))}
                
                </Select>
                </FormControl>
            </div>
  )
}

export default SelectButton