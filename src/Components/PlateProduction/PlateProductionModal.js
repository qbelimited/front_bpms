import React from 'react'
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '../SelectValue/Button'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import TextBox from '../SelectValue/TextBox';
import SelectButton from '../SelectValue/SelectButton';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
function PlateProductionModal({open, handleClose}) {
//       const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
const bool = true
  const color = ['red', 'blue', 'orange']
  const size = ['Small', 'Big', 'Large']
  return (
    <div>
      
      <Modal
        open={open}
        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={style} className=' shadow-lg rounded-md'>
          <Typography id="modal-modal-title" className='' variant="h6" component="h2">
            <div className=' flex justify-between'>
                <h1 className=' text-gray-400'>Start manufacturing</h1>
               <div onClick={handleClose}>
               <HighlightOffOutlinedIcon />
               </div> 
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className=' mb-2'>
                <label className=' block mb-1'>Select a colour</label>
                <SelectButton 
                    items={color}
                    bool={true}
                />
            </div>
            <div>
                <label className=' block mb-1'>Select a size</label>
                <div className=' w-full'>
                <SelectButton 
                    items={size}
                    bool={true}
                />
                </div>
                
            </div>
            <div className=' mt-3 grid grid-cols-3 gap-4'>
                <div className=' col-span-2 '>
                    <TextBox 
                        label='Enter last serial number'
                        type='text'
                        bool={bool}
                    />
                </div>
                <div>
                <TextBox 
                        label='Quantity'
                        type='text'
                        bool={bool}
                    />
                </div>
            </div>

          </Typography>
          <div className=' mt-3'>
          <Button 
            name='Start manufacturing'
           
          />
          </div>
          
        </Box>
      </Modal>
    </div>
  )
}

export default PlateProductionModal