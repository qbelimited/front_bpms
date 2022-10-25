import React from 'react'
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
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

function ManagePlateModal({open, handleClose}) {
  return (
    <div>
        
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"

    >
      <Box sx={style} className=' shadow-lg rounded-md'>
        <Typography id="modal-modal-title" className='' variant="h6" component="h2">
          <div className=' flex justify-between'>
              <h1 className=' text-gray-400'>ACC-233GH</h1>
             <div onClick={handleClose}>
             <HighlightOffOutlinedIcon />
             </div> 
          </div>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className=' mt-2'>
          <h1 className=' text-gray-400'>Location:</h1>
          <h3 className='  mt-2'>Accra</h3>
          </div>
          <div className=' mt-4'>
          <h1 className=' text-gray-400'>Manufacture date:</h1>
          <h3 className='  mt-2'>20 Sept, 2022 - 13:29</h3>
          </div>
          <div className=' flex justify-between mt-4'>
          <div>
          <h1 className=' text-gray-400'>Batch No:</h1>
          <h3 className='  mt-2'>20</h3>
          </div>
         <div>
         <h1 className=' text-gray-400'>Serial No:</h1>
          <h3 className='  mt-2'>2837-1635-2653</h3>
         </div>
         <div></div>
          </div>
          <div className=' flex justify-between mt-4'>
          <div>
          <h1 className=' text-gray-400'>Color:</h1>
          <h3 className='  mt-2'>Red</h3>
          </div>
         <div>
         <h1 className=' text-gray-400'>Size:</h1>
          <h3 className='  mt-2'>Small</h3>
         </div>
         <div></div>
          </div>
        </Typography>
        
        
      </Box>
    </Modal>
  </div>
  )
}

export default ManagePlateModal