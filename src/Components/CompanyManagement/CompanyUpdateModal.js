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

function CompanyUpdateModal({open, handleClose}) {
    const bool = true
    const color = ['Accra', 'Kumasi', 'Capecoast']
   
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
                  <h1 className=' text-gray-400'>Update company information</h1>
                 <div onClick={handleClose}>
                 <HighlightOffOutlinedIcon />
                 </div> 
              </div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className=' mb-2'>
                 
                  <TextBox 
                     label='Comapany name'
                     type='text'
                     bool={bool}
                     value='ABC Limited'
                  />
              </div>
              <div>
                  <label className=' block mb-1'>Location</label>
                  <div className=' w-full'>
                  <SelectButton 
                      items={color}
                      bool={true}
                  />
                  </div>
                  
              </div>
              <div className=' mt-3 grid grid-cols-3 gap-4'>
                  <div className=' col-span-3 '>
                      <TextBox 
                          label='Phone'
                          type='tel'
                          bool={bool}
                          value='022444245'
                      />
                  </div>
                 
              </div>
              <div className=' mt-3 grid grid-cols-3 gap-4'>
                  <div className=' col-span-3 '>
                      <TextBox 
                          label='Email'
                          type='email'
                          bool={bool}
                          value='abc@gmail.com'
                      />
                  </div>
                  </div>
            </Typography>
            <div className=' mt-3'>
            <Button 
              name='Update company'
             
            />
            </div>
            
          </Box>
        </Modal>
      </div>
  )
}

export default CompanyUpdateModal