import React, { useState} from 'react'
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '../SelectValue/Button'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import TextBox from '../SelectValue/TextBox';
import SelectPlate from './selectPlate';
import SelectColor from './SelectColor';
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
function EmbosingModal({open, handleClose}) {
    const bool = true
   
    const[colors, setColors] = useState('')
    const [plate, setPlate] = useState('')
    const [text, setText] = useState('')
   
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
                  <h1 className=' text-gray-400'>Start embossing</h1>
                 <div onClick={handleClose}>
                 <HighlightOffOutlinedIcon />
                 </div> 
              </div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className=' mb-2'>
                  <label className=' block mb-1'>Select available plates</label>
                  <SelectPlate
                      bool={true}
                      value={plate}
                      onChange={setPlate}
                  />
              </div>
              <div>
                  <label className=' block mb-1'>Select a colour</label>
                  <div className=' w-full'>
                  <SelectColor
                   bool={bool}
                   value={colors}
                   onChange={setColors}
                  />
                  </div>
                  
              </div>
              <div className=' mt-3 grid grid-cols-3 gap-4'>
                  <div className=' col-span-3 '>
                      <TextBox 
                          label='Embossing text'
                          type='text'
                          bool={bool}
                          onChange={setText}
                          value={text}
                      />
                  </div>
                  
              </div>
              
              <div>
              <TextBox 
                          label='Serial Number'
                          type='text'
                          bool={bool}
                          onChange={setText}
                          value={text}
                      />
                  
              </div>
  
            </Typography>
            <div className=' mt-3'>
            <Button 
              name='Start embossing'
             
            />
            </div>
            
          </Box>
        </Modal>
      </div>
  )
}

export default EmbosingModal