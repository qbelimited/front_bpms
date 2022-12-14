import React from 'react'
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '../SelectValue/Button'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import TextBox from '../SelectValue/TextBox';
import SelectButton from '../SelectValue/SelectButton';
import ClipboardCopy from '../SelectValue/ClipboardCopy';

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

function UserUpdateModal({open, handleClose}) {
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
                     label='Full name'
                     type='text'
                     bool={bool}
                     value='James brown'
                  />
              </div>
              <div className=' mb-2 grid md:grid-cols-2 gap-4'>
              <div>
              <TextBox 
                     label='Phone'
                     type='tel'
                     bool={bool}
                     value='022444245'
                  />
                  
              </div>
              <div>
              <TextBox 
                     label='Email'
                     type='email'
                     bool={bool}
                     value='abc@gmail.com'
                  />
                  
              </div>
              </div>
              <div>
                  <label className=' block mb-1'>Assign company</label>
                  <div className=' w-full'>
                  <SelectButton 
                      items={color}
                      bool={true}
                  />
                  </div>
                  </div>
              <div className=' mt-3 grid grid-cols-2 gap-4'>
              <div>
                  <label className=' block mb-1'>User type</label>
                  <div className=' w-full'>
                  <SelectButton 
                      items={color}
                      bool={true}
                  />
                  </div>
                  </div>
                  <div>
                  <label className=' block mb-1'>Password</label>
                  <div className=' w-full'>
                  <ClipboardCopy
                    copyText='xbh!2#nudk.k,'
                   
                   />
                  </div>
                  </div>
                 
              </div>
              
            </Typography>
            <div className=' mt-3'>
            <Button 
              name='Update user'
             
            />
            </div>
            
          </Box>
        </Modal>
      </div>
  )
}

export default UserUpdateModal