import React, {useState} from 'react'
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '../SelectValue/Button'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import TextBox from '../SelectValue/TextBox';
import postService from '../../Services/post-services';
import swal from 'sweetalert';


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

function StorageModal({open, handleClose}) {
    const bool = true
  const [name, setName] = useState('')
  const[loading, setLoading] = useState(false)
    
   const handleSubmit = async () =>{
    setLoading(true)
     postService.addWareHouse(name).then(
      (response) => {
        console.log('testing --------' + response.data)
        setName('')
        swal("Warehouse added successfully")
        .then(() => {
         window.location.reload()
       });
      },
      (error) => {
        
          swal("Warehouse name already exist!!!")
           .then(() => {
            window.location.reload()
          });
         
         
          setName('')
         
      }
    )
  
    
   }
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
                  <h1 className=' text-gray-400'>Add New Warehouse</h1>
                 <div onClick={handleClose}>
                 <HighlightOffOutlinedIcon />
                 </div> 
              </div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className=' mb-2'>
                 
                  <TextBox 
                     label='Name'
                     type='text'
                     bool={bool}
                     value={name}
                     onChange={setName}
                  />
              </div>
              
             
            </Typography>
            <div className=' mt-3'>
            <Button 
              name={loading ? 'Sending data' :'Add Warehouse'}
             onClick={handleSubmit}
            />
            </div>
            
          </Box>
        </Modal>
      </div>
  )
}

export default StorageModal