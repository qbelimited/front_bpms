import React from 'react'
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '../SelectValue/Button'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import TextBox from '../SelectValue/TextBox';
import CmButtons from '../SelectValue/CmButtons';

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
function PlateSizeModal({open, handleClose}) {
    const bool = true
   
   
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
                  <h1 className=' text-gray-400'>Add new plate size</h1>
                 <div onClick={handleClose}>
                 <HighlightOffOutlinedIcon />
                 </div> 
              </div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className=' mb-2'>
                 
                  <TextBox 
                     label='Plate size'
                     type='text'
                     bool={bool}
                  />
              </div>
             
              <div className=' mt-3 grid grid-cols-2 gap-4'>
                  <div className=' '>
                      <CmButtons 
                        value='0'
                        label='Width'
                      />
                  </div>
                  <div className=' '>
                      <CmButtons 
                        value='0'
                        label='Height'
                      />
                  </div>
                  </div>
  
            </Typography>
            <div className=' mt-3'>
            <Button 
              name='Add plate size'
             
            />
            </div>
            
          </Box>
        </Modal>
      </div>
  )
}

export default PlateSizeModal