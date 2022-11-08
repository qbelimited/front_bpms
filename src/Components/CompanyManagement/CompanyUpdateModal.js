import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import swal from 'sweetalert';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '../SelectValue/Button'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import TextBox from '../SelectValue/TextBox';
import SelectButton from '../SelectValue/SelectButton';
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

function CompanyUpdateModal({open, handleClose, name, status, phone, email, id, location}) {
    const bool = true
   const [loading, setLoading] = useState(false)

    const[names, setName] = useState('')
    const [locations, setLocation] = useState('')
    const [phones, setPhone] = useState('')
    const [emails, setEmail] = useState('')
    const[ statuss, setStatus] = useState('')
    const [ids, setId] = useState('')

    useEffect(() =>{
      setName(name)
      setPhone(phone)
      setEmail(email)
      setId(id)
      setStatus(status)
      setLocation(location)
      
    }, [name, phone, email, id, status, location])

    const handleSubmit = (e) =>{
      e.preventDefault()
      setLoading(true)
      postService.updateCompany(names,locations,phones,emails,statuss, ids).then(
        (response) => {
          console.log(response.data)
          swal("Company details Updated Successfully")
            .then((value) => {
              window.location.reload()
            });
          
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
            return  swal('Update failed!!')
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
                  <h1 className=' text-gray-400'>Update company information</h1>
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
                     value={names}
                     onChange={setName}
                  />
              </div>
              <div>
              <TextBox 
                     label='Location'
                     type='text'
                     bool={bool}
                     value={locations}
                     onChange={setLocation}
                  />
                  
                 
              </div>
              <div className=' mt-3 '>
                  
                      <TextBox 
                          label='Phone'
                          type='tel'
                          bool={bool}
                          value={phones}
                     onChange={setPhone}
                      />
              </div>
              <div className=' mt-3 '>
                  
                      <TextBox 
                          label='Email'
                          type='email'
                          bool={bool}
                          value={emails}
                     onChange={setEmail}
                      />
                  </div>
                 
            </Typography>
            <div className=' mt-3'>
            <Button 
              name={loading ? 'Loading...' :'Update company'}
            
            />
            </div>
            </form>
            
          </Box>
        </Modal>
      </div>
  )
}

export default CompanyUpdateModal