import React, {useState} from 'react'
import Box from '@mui/material/Box';
import swal from 'sweetalert';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

import postService from '../../Services/post-services';

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

function DeactivateCompany({open, handleClose, id}) {
    const [loading, setLoading] = useState(false)

    const handleActivate = () =>{
        setLoading(true)
        postService.deactivateCompany(id).then(
            (response) => {
                console.log(response.data)
                swal("Deactivation Successfully")
                  .then((value) => {
                    window.location.reload()
                  });
                setLoading(false)
              },
              (error) => {
                const _content =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
                  return  swal('Deactivation Failed')
                  .then((value) => {
                    window.location.reload()
                  });
                 
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
                  <h1 className=' text-gray-400'>Deactivate company</h1>
                 <div onClick={handleClose}>
                 <HighlightOffOutlinedIcon />
                 </div> 
              </div>
            </Typography>

            <div className=' mt-4'>
                <p className=' text-center font-bold mb-3'>Click OK to confirm Deactivation</p>
                    <div className=' flex justify-center'>
                        <div className=' flex justify-between'>
                            <div>
                                <button onClick={handleClose} className=' bg-green-800 p-3 rounded-md m-2 text-white'>
                                    No
                                </button>
                                <button onClick={handleActivate} className=' bg-red-800 p-3 m-2 rounded-md text-white'>
                                  {loading? 'Loading' :  'Yes'}
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
           
            
          </Box>
        </Modal>
      </div>
  )
}

export default DeactivateCompany