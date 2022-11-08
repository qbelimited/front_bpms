import React, {useState} from 'react'
import Box from '@mui/material/Box';
import swal from 'sweetalert';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '../SelectValue/Button'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import TextBox from '../SelectValue/TextBox';
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
function CompanyCreateModal({open, handleClose}) {
    const bool = true
    const [loading, setLoading] = useState(false)
    const [cName, setCName] = useState('')
    const [location, setLocation] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (e)=>{
      e.preventDefault()
      setLoading(true)
      postService.addCompany(cName, location, phone,email).then(
        (response) => {
          console.log(response.data)
          swal("New company Added Successfully")
            .then((value) => {
              window.location.reload()
            });
          
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
            return  swal(_content)
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
                  <h1 className=' text-gray-400'>Add new company</h1>
                 <div onClick={handleClose}>
                 <HighlightOffOutlinedIcon />
                 </div> 
              </div>
            </Typography>
           <form onSubmit={handleSubmit}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className=' mb-2'>
                 
                  <TextBox 
                     label='Comapany name'
                     type='text'
                     bool={bool}
                     value={cName}
                     onChange={setCName}
                  />
              </div>
              <div>
              <TextBox 
                     label='Location'
                     type='text'
                     bool={bool}
                     value={location}
                     onChange={setLocation}
                  />
                  
              </div>
              <div className=' mt-3 grid grid-cols-3 gap-4'>
                  <div className=' col-span-3 '>
                      <TextBox 
                          label='Phone'
                          type='tel'
                          bool={bool}
                          value={phone}
                          onChange={setPhone}
                      />
                  </div>
                  
              </div>
              <div className=' mt-3 grid grid-cols-3 gap-4'>
                  <div className=' col-span-3 '>
                      <TextBox 
                          label='Email'
                          type='email'
                          bool={bool}
                          value={email}
                          onChange={setEmail}
                      />
                  </div>
                  </div>
  
            </Typography>
            <div className=' mt-3'>
            <Button 
              name={loading? 'Loading...' :'Update company'}
             
            />
            </div>
            </form>
            
          </Box>
        </Modal>
      </div>
  )
}

export default CompanyCreateModal